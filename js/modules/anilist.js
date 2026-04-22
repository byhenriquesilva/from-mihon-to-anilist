const ANILIST_API = 'https://graphql.anilist.co';

export async function syncMangaList(token, entries, logCallback) {
  let successCount = 0;
  let errorCount = 0;

  // Busca o userId do usuário autenticado UMA VEZ antes do loop
  const userId = await getViewerId(token);
  if (!userId) {
    logCallback('❌ Não foi possível obter o ID do usuário. Verifique o token.', 'error');
    return { success: 0, errors: entries.length };
  }
  logCallback(`👤 Usuário AniList ID: ${userId}`, 'info');

  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    try {
      const result = await processMangaEntry(token, userId, entry, logCallback, i + 1, entries.length);
      if (result) successCount++;
      else errorCount++;
    } catch (e) {
      errorCount++;
      logCallback(`Erro inesperado em "${entry.title}": ${e.message}`, 'error');
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  return { success: successCount, errors: errorCount };
}

async function processMangaEntry(token, userId, entry, log, index, total) {
  const { title, lastChapterRead } = entry;
  log(`📖 [${index}/${total}] Processando: ${title}`, 'info');

  try {
    const mediaId = await searchMangaByTitleEnhanced(title, token, log);
    if (!mediaId) {
      log(`⚠️ Não encontrado no AniList: "${title}"`, 'warning');
      return false;
    }

    const listEntry = await getMediaListEntry(mediaId, userId, token);
    const progress = lastChapterRead !== null ? Math.floor(lastChapterRead) : 0;
    const status = progress > 0 ? 'CURRENT' : 'PLANNING';

    if (listEntry) {
      const updated = await updateMediaListEntry(listEntry.id, { progress, status }, token);
      if (updated) {
        log(`✅ Atualizado: ${title} → Cap. ${progress}`, 'success');
        return true;
      } else {
        log(`❌ Falha ao atualizar: ${title}`, 'error');
        return false;
      }
    } else {
      const created = await saveMediaListEntry(mediaId, { progress, status }, token);
      if (created) {
        log(`➕ Adicionado: ${title} (Status: ${status}, Cap. ${progress})`, 'success');
        return true;
      } else {
        log(`❌ Falha ao adicionar: ${title}`, 'error');
        return false;
      }
    }
  } catch (error) {
    log(`🔥 Erro na API para "${title}": ${error.message}`, 'error');
    return false;
  }
}

async function getViewerId(token) {
  const query = `query { Viewer { id } }`;
  const response = await fetch(ANILIST_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ query })
  });
  const data = await response.json();
  return data.data?.Viewer?.id || null;
}

async function searchMangaByTitleEnhanced(title, token, log) {
  let cleanTitle = title.replace(/\s*[\[\(].*?[\]\)]\s*/g, '').trim();
  if (!cleanTitle) cleanTitle = title;

  const query = `
    query ($search: String) {
      Media (search: $search, type: MANGA) {
        id
      }
    }
  `;

  try {
    const id = await doSearch(cleanTitle, token, query);
    if (id) return id;
  } catch (e) {}

  if (cleanTitle !== title) {
    log(`   ↳ Tentando busca com título original: "${title}"`, 'info');
    try {
      const id = await doSearch(title, token, query);
      if (id) return id;
    } catch (e) {}
  }

  return null;
}

async function doSearch(searchTerm, token, query) {
  const response = await fetch(ANILIST_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ query, variables: { search: searchTerm } })
  });

  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();
  if (data.errors) throw new Error(data.errors[0].message);
  return data.data?.Media?.id || null;
}

// CORRIGIDO: recebe userId para filtrar a lista do usuário autenticado
async function getMediaListEntry(mediaId, userId, token) {
  const query = `
    query ($mediaId: Int, $userId: Int) {
      MediaList (mediaId: $mediaId, userId: $userId) {
        id
        progress
        status
      }
    }
  `;
  const response = await fetch(ANILIST_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ query, variables: { mediaId, userId } })
  });
  const data = await response.json();
  if (data.errors) return null; // obra não está na lista ainda
  return data.data?.MediaList || null;
}

async function updateMediaListEntry(entryId, updates, token) {
  const mutation = `
    mutation ($id: Int, $progress: Int, $status: MediaListStatus) {
      SaveMediaListEntry (id: $id, progress: $progress, status: $status) {
        id
        progress
        status
      }
    }
  `;

  const variables = {
    id: entryId,
    progress: parseInt(updates.progress) || 0,
    status: updates.status
  };

  const response = await fetch(ANILIST_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ query: mutation, variables })
  });

  const data = await response.json();
  if (data.errors) {
    console.error('Erro ao atualizar entrada:', data.errors);
    return false;
  }
  return true;
}

async function saveMediaListEntry(mediaId, updates, token) {
  const mutation = `
    mutation ($mediaId: Int, $progress: Int, $status: MediaListStatus) {
      SaveMediaListEntry (mediaId: $mediaId, progress: $progress, status: $status) {
        id
        progress
        status
      }
    }
  `;
  const variables = {
    mediaId: mediaId,
    progress: parseInt(updates.progress) || 0,
    status: updates.status
  };
  const response = await fetch(ANILIST_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ query: mutation, variables })
  });
  const data = await response.json();
  if (data.errors) {
    console.error('Erro ao salvar entrada:', data.errors);
    return false;
  }
  return true;
}

export async function validateToken(token) {
  const query = `query { Viewer { id } }`;
  try {
    const response = await fetch(ANILIST_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ query })
    });
    const data = await response.json();
    return !data.errors && data.data?.Viewer?.id;
  } catch {
    return false;
  }
}
