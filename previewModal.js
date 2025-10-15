// previewModal.js
;(function () {
  // 1. Inject CSS
  const css = `
    /* Overlay */
    .modal {
      display: none;
      position: fixed;
      top: 0; left: 0;
      width: 100vw; height: 100vh;
      background: rgba(0, 0, 0, 0.7);
      justify-content: center; align-items: center;
      z-index: 10000;
    }
    /* White content box */
    .modal-content {
      background: #fff;
      padding: 16px;
      border-radius: 8px;
      max-width: 90vw;
      max-height: 90vh;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    /* Image wrapper */
    .preview-image-container {
      max-width: 80vw;
      max-height: 70vh;
      overflow: auto;
    }
    .modal-preview-image {
      max-width: 100%; max-height: 100%;
      transform-origin: center center;
      transition: transform 0.2s ease;
    }
    /* Buttons row */
    .preview-buttons {
      display: flex;
      gap: 8px;
      margin-top: 12px;
    }
    .modal-btn {
      padding: 6px 12px;
      border: none;
      background: #007acc;
      color: #fff;
      font-size: 0.9rem;
      border-radius: 4px;
      cursor: pointer;
    }
    .modal-btn:hover {
      background: #005fa3;
    }
  `.trim()
  const styleEl = document.createElement('style')
  styleEl.textContent = css
  document.head.appendChild(styleEl)

  // 2. Build Modal HTML
  const modal = document.createElement('div')
  modal.id = 'previewModal'
  modal.className = 'modal'
  modal.innerHTML = `
    <div class="modal-content">
      <div class="preview-image-container">
        <img id="previewModalImage" class="modal-preview-image" alt="Preview" />
      </div>
      <div class="preview-buttons">
        <button id="modalZoomIn" class="modal-btn">Zoom In</button>
        <button id="modalZoomOut" class="modal-btn" style="display:none;">Zoom Out</button>
        <button id="modalEdit" class="modal-btn">Edit</button>
        <button id="modalClose" class="modal-btn">Close</button>
      </div>
    </div>
  `.trim()
  document.body.appendChild(modal)

  // 3. State & Elements
  let currentZoom = 1
  const previewModal = document.getElementById('previewModal')
  const imgEl = document.getElementById('previewModalImage')
  const btnZoomIn = document.getElementById('modalZoomIn')
  const btnZoomOut = document.getElementById('modalZoomOut')
  const btnEdit = document.getElementById('modalEdit')
  const btnClose = document.getElementById('modalClose')

  // 4. Open preview (exposed globally)
  window.openPreview = function (src, onEdit) {
    imgEl.src = src
    currentZoom = 1
    imgEl.style.transform = 'scale(1)'
    btnZoomOut.style.display = 'none'
    previewModal.style.display = 'flex'
    // optionally override edit callback
    previewModal._onEdit = typeof onEdit === 'function' ? onEdit : null
  }

  // 5. Close preview
  function closePreview() {
    previewModal.style.display = 'none'
    imgEl.src = ''
  }

  // 6. Zoom handlers
  function zoomIn() {
    if (currentZoom < 3) {
      currentZoom = +(currentZoom + 0.2).toFixed(2)
      imgEl.style.transform = `scale(${currentZoom})`
      btnZoomOut.style.display = currentZoom > 1 ? 'inline-block' : 'none'
    }
  }
  function zoomOut() {
    if (currentZoom > 1) {
      currentZoom = +Math.max(1, currentZoom - 0.2).toFixed(2)
      imgEl.style.transform = `scale(${currentZoom})`
      btnZoomOut.style.display = currentZoom > 1 ? 'inline-block' : 'none'
    }
  }

  // 7. Event listeners
  // Close when clicking backdrop
  modal.addEventListener('click', (e) => {
    if (e.target === previewModal) closePreview()
  })
  btnClose.addEventListener('click', closePreview)
  btnZoomIn.addEventListener('click', zoomIn)
  btnZoomOut.addEventListener('click', zoomOut)
  btnEdit.addEventListener('click', () => {
    if (previewModal._onEdit) previewModal._onEdit(imgEl.src)
  })

  // Optional: Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && previewModal.style.display === 'flex') {
      closePreview()
    }
  })
})()
