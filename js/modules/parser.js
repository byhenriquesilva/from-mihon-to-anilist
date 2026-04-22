// js/modules/parser.js

// Schema Protocol Buffers do backup Mihon/Tachiyomi (formato Tesdv)
const PROTO_SCHEMA = `
syntax = "proto2";
package backup;

message PreferenceValue {
    required string type = 1;
    required bytes truevalue = 2;
}

message Backup {
    repeated BackupManga backupManga = 1;
    repeated BackupCategory backupCategories = 2;
    repeated BackupSource backupSources = 101;
    repeated BackupPreference backupPreferences = 104;
    repeated BackupSourcePreferences backupSourcePreferences = 105;
    repeated BackupExtensionRepos backupExtensionRepo = 106;
}

message BackupCategory {
    required string name = 1;
    optional int64 order = 2;
    optional int64 id = 3;
    optional int64 flags = 100;
}

message BackupChapter {
    required string url = 1;
    required string name = 2;
    optional string scanlator = 3;
    optional bool read = 4;
    optional bool bookmark = 5;
    optional int64 lastPageRead = 6;
    optional int64 dateFetch = 7;
    optional int64 dateUpload = 8;
    optional float chapterNumber = 9;
    optional int64 sourceOrder = 10;
    optional int64 lastModifiedAt = 11;
    optional int64 version = 12;
}

message BackupExtensionRepos {
    required string baseUrl = 1;
    required string name = 2;
    optional string shortName = 3;
    required string website = 4;
    required string signingKeyFingerprint = 5;
}

message BackupHistory {
    required string url = 1;
    required int64 lastRead = 2;
    optional int64 readDuration = 3;
}

message BackupManga {
    required int64 source = 1;
    required string url = 2;
    optional string title = 3;
    optional string artist = 4;
    optional string author = 5;
    optional string description = 6;
    repeated string genre = 7;
    optional int32 status = 8;
    optional string thumbnailUrl = 9;
    optional int64 dateAdded = 13;
    optional int32 viewer = 14;
    repeated BackupChapter chapters = 16;
    repeated int64 categories = 17;
    repeated BackupTracking tracking = 18;
    optional bool favorite = 100;
    optional int32 chapterFlags = 101;
    optional int32 viewer_flags = 103;
    repeated BackupHistory history = 104;
    optional UpdateStrategy updateStrategy = 105;
    optional int64 lastModifiedAt = 106;
    optional int64 favoriteModifiedAt = 107;
    repeated string excludedScanlators = 108;
    optional int64 version = 109;
    optional string notes = 110;
}

message BackupPreference {
    required string key = 1;
    required PreferenceValue value = 2;
}

message BackupSourcePreferences {
    required string sourceKey = 1;
    repeated BackupPreference prefs = 2;
}

message BackupSource {
    optional string name = 1;
    required int64 sourceId = 2;
}

message BackupTracking {
    required int32 syncId = 1;
    required int64 libraryId = 2;
    optional int32 mediaIdInt = 3;
    optional string trackingUrl = 4;
    optional string title = 5;
    optional float lastChapterRead = 6;
    optional int32 totalChapters = 7;
    optional float score = 8;
    optional int32 status = 9;
    optional int64 startedReadingDate = 10;
    optional int64 finishedReadingDate = 11;
    optional bool private = 12;
    optional int64 mediaId = 100;
}

enum UpdateStrategy {
    ALWAYS_UPDATE = 0;
    ONLY_FETCH_ONCE = 1;
}
`;

// Carrega o schema uma vez
let BackupMessage = null;
function getBackupMessage() {
  if (!BackupMessage) {
    const root = protobuf.parse(PROTO_SCHEMA).root;
    BackupMessage = root.lookupType("backup.Backup");
  }
  return BackupMessage;
}

/**
 * Analisa o arquivo .tachibk (protobuf+gzip) ou .csv
 */
export async function parseFile(file) {
  const fileName = file.name.toLowerCase();
  
  if (fileName.endsWith('.tachibk')) {
    return parseTachibk(file);
  } else if (fileName.endsWith('.csv')) {
    return parseCsv(file);
  } else {
    throw new Error('Formato de arquivo não suportado. Use .tachibk ou .csv');
  }
}

/**
 * Processa arquivo .tachibk (backup Protobuf comprimido com Gzip)
 */
async function parseTachibk(file) {
  const arrayBuffer = await file.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);
  
  // 1. Descomprimir Gzip
  let decompressed;
  try {
    decompressed = pako.ungzip(bytes);
  } catch (e) {
    throw new Error('Falha ao descomprimir o arquivo .tachibk. O arquivo está corrompido ou não é um backup válido.');
  }

  // 2. Decodificar Protobuf
  let message;
  try {
    const Backup = getBackupMessage();
    message = Backup.decode(decompressed);
  } catch (e) {
    // Se falhar, tenta como JSON puro (backups muito antigos)
    try {
      const text = new TextDecoder().decode(decompressed);
      const json = JSON.parse(text);
      return extractFromJson(json);
    } catch {
      throw new Error('Arquivo .tachibk inválido: não foi possível decodificar como protobuf nem como JSON.');
    }
  }

  // 3. Converter para objeto JavaScript
  const Backup = getBackupMessage();
  const obj = Backup.toObject(message, { longs: String, enums: String, defaults: true });
  return extractFromProto(obj);
}

/**
 * Extrai dados do objeto Proto convertido
 */
function extractFromProto(obj) {
  const mangaList = obj.backupManga || [];
  const entries = [];

  for (const manga of mangaList) {
    const title = manga.title;
    if (!title) continue;

    // Determina o último capítulo lido
    let lastChapterRead = 0.0;

    // 1. Verifica capítulos marcados como lidos
    if (manga.chapters) {
      const readChapters = manga.chapters
        .filter(ch => ch.read)
        .map(ch => ch.chapterNumber || 0);
      if (readChapters.length > 0) {
        lastChapterRead = Math.max(...readChapters);
      }
    }

    // 2. Se não encontrou, tenta via tracking (ex.: AniList, MAL)
    if (lastChapterRead === 0.0 && manga.tracking) {
      const trackReads = manga.tracking.map(t => t.lastChapterRead || 0);
      if (trackReads.length > 0) {
        lastChapterRead = Math.max(...trackReads);
      }
    }

    // 3. Se ainda não tem, usa history (último capítulo lido registrado)
    if (lastChapterRead === 0.0 && manga.history && manga.history.length > 0) {
      // A data mais recente de leitura
      const sorted = [...manga.history].sort((a, b) => (b.lastRead || 0) - (a.lastRead || 0));
      // Não temos o número do capítulo na history, apenas URL. Então ignoramos.
    }

    if (lastChapterRead > 0) {
      entries.push({
        title: title.trim(),
        lastChapterRead: lastChapterRead
      });
    } else {
      // Mesmo sem capítulo, podemos adicionar com progresso 0 (para Planejar)
      entries.push({
        title: title.trim(),
        lastChapterRead: null
      });
    }
  }

  return entries;
}

/**
 * Fallback para JSON puro (backups antigos)
 */
function extractFromJson(json) {
  const mangaList = json.backupManga || json.manga || [];
  const entries = [];
  for (const manga of mangaList) {
    const title = manga.title || manga.manga?.title;
    if (!title) continue;
    let lastChapterRead = null;
    const chap = manga.lastChapterRead ?? (manga.chapters ? Math.max(...manga.chapters.filter(c=>c.read).map(c=>c.chapterNumber||0)) : null);
    if (chap !== undefined && chap !== null) {
      const num = parseFloat(chap);
      if (!isNaN(num)) lastChapterRead = num;
    }
    entries.push({ title: title.trim(), lastChapterRead });
  }
  return entries;
}

/**
 * Processa arquivo .csv com suporte a campos entre aspas
 */
async function parseCsv(file) {
  const text = await file.text();
  const lines = text.split(/\r?\n/).filter(line => line.trim() !== '');
  const entries = [];

  function parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"' && !inQuotes) {
        inQuotes = true;
      } else if (char === '"' && inQuotes) {
        if (i + 1 < line.length && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current.trim());
    return result;
  }

  let startIndex = 0;
  if (lines.length > 0) {
    const firstCol = parseCSVLine(lines[0])[0].toLowerCase();
    if (firstCol.includes('title') || firstCol.includes('manga') || firstCol.includes('nome')) {
      startIndex = 1;
    }
  }

  for (let i = startIndex; i < lines.length; i++) {
    const columns = parseCSVLine(lines[i]);
    if (columns.length === 0) continue;
    
    let title = columns[0];
    if (!title) continue;

    title = title.replace(/^"|"$/g, '').trim();
    const cleanTitle = title.replace(/\s*[\[\(].*?[\]\)]\s*/g, '').trim();

    entries.push({
      title: cleanTitle || title,
      lastChapterRead: null
    });
  }

  return entries;
}