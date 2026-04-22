import { parseFile } from './modules/parser.js';
import { 
  log, 
  clearConsole, 
  setSyncButtonState, 
  setFileInputState,
  getToken,
  getFile 
} from './modules/ui.js';
import { syncMangaList, validateToken } from './modules/anilist.js';

// Elementos da UI
const syncBtn = document.getElementById('syncBtn');
const clearConsoleBtn = document.getElementById('clearConsoleBtn');
const tokenInput = document.getElementById('token');
const fileInput = document.getElementById('fileInput');

// Console modal
const consoleOverlay = document.getElementById('consoleOverlay');
const consoleNavBtn  = document.getElementById('consoleNavBtn');
const consoleCloseBtn = document.getElementById('consoleCloseBtn');

function openConsole() {
  consoleOverlay.classList.add('open');
  consoleNavBtn.classList.add('active');
}

function closeConsole() {
  consoleOverlay.classList.remove('open');
  consoleNavBtn.classList.remove('active');
}

consoleNavBtn.addEventListener('click', () => {
  consoleOverlay.classList.contains('open') ? closeConsole() : openConsole();
});

consoleCloseBtn.addEventListener('click', closeConsole);

// Close on overlay click (outside modal)
consoleOverlay.addEventListener('click', (e) => {
  if (e.target === consoleOverlay) closeConsole();
});

// Close with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && consoleOverlay.classList.contains('open')) closeConsole();
});

// Event Listeners
syncBtn.addEventListener('click', startSync);
clearConsoleBtn.addEventListener('click', () => clearConsole());

/**
 * Inicia o processo de sincronização
 */
async function startSync() {
  const token = getToken();
  const file = getFile();

  if (!token) {
    log('Erro: Token do AniList não informado.', 'error');
    return;
  }

  if (!file) {
    log('Erro: Nenhum arquivo selecionado.', 'error');
    return;
  }

  setSyncButtonState(true);
  setFileInputState(true);
  tokenInput.disabled = true;

  // Abre o console automaticamente ao iniciar
  openConsole();

  log('🚀 Iniciando processo de sincronização...', 'info');
  log(`📄 Arquivo: ${file.name}`, 'info');

  // Validação do token
  log('🔑 Validando token...', 'info');
  const isValid = await validateToken(token);
  if (!isValid) {
    log('❌ Token inválido ou sem permissão para acessar o AniList.', 'error');
    setSyncButtonState(false);
    setFileInputState(false);
    tokenInput.disabled = false;
    return;
  }
  log('✅ Token válido!', 'success');

  try {
    const entries = await parseFile(file);
    log(`✅ Encontradas ${entries.length} obras.`, 'success');

    if (entries.length === 0) {
      log('⚠️ Nenhuma obra encontrada no arquivo.', 'warning');
      return;
    }

    const result = await syncMangaList(token, entries, (message, type) => log(message, type));
    log(`📊 Sincronização concluída! Sucesso: ${result.success}, Erros: ${result.errors}`, 'info');
  } catch (error) {
    log(`❌ Erro fatal: ${error.message}`, 'error');
  } finally {
    setSyncButtonState(false);
    setFileInputState(false);
    tokenInput.disabled = false;
  }
}