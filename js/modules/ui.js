const consoleDiv = document.getElementById('console');
const syncBtn    = document.getElementById('syncBtn');
const fileInput  = document.getElementById('fileInput');
const tokenInput = document.getElementById('token');
const consoleDot = document.getElementById('consoleDot');

export function log(message, type = 'info') {
  const line = document.createElement('div');
  line.className = `log-line ${type}`;

  const time = document.createElement('span');
  time.className = 'log-time';
  time.textContent = `[${new Date().toLocaleTimeString()}]`;

  const msg = document.createElement('span');
  msg.className = 'log-msg';
  msg.textContent = message;

  line.appendChild(time);
  line.appendChild(msg);
  consoleDiv.appendChild(line);
  consoleDiv.scrollTop = consoleDiv.scrollHeight;
}

export function clearConsole() {
  consoleDiv.innerHTML = '';
  log('Console limpo.', 'info');
}

export function setSyncButtonState(loading) {
  syncBtn.disabled = loading;
  syncBtn.classList.toggle('loading', loading);
  consoleDot.classList.toggle('active', loading);
}

export function setFileInputState(disabled) {
  fileInput.disabled = disabled;
}

export function getToken() {
  return tokenInput.value.trim();
}

export function getFile() {
  return fileInput.files[0] || null;
}
