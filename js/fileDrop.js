// ── File drop UX ──
export function initFileDrop() {
  const drop             = document.getElementById('fileDrop');
  const fileInput        = document.getElementById('fileInput');
  const selectedName     = document.getElementById('selectedName');
  const selectedNameText = document.getElementById('selectedNameText');

  if (!drop || !fileInput) return;

  function showFileName(name) {
    selectedNameText.textContent = name;
    selectedName.classList.add('visible');
  }

  fileInput.addEventListener('change', () => {
    if (fileInput.files[0]) showFileName(fileInput.files[0].name);
  });

  drop.addEventListener('dragover',  e => { e.preventDefault(); drop.classList.add('drag-over'); });
  drop.addEventListener('dragleave', ()  => drop.classList.remove('drag-over'));
  drop.addEventListener('drop', e => {
    e.preventDefault();
    drop.classList.remove('drag-over');
    const file = e.dataTransfer.files[0];
    if (file) {
      fileInput.files = e.dataTransfer.files;
      showFileName(file.name);
    }
  });
}
