// 1. Inject styles into the document head
const style = document.createElement('style');
style.textContent = `
.modal {
  display: none;
  position: fixed;
  z-index: 10000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  align-items: center;
  justify-content: center;
}

#previewContent {
  display: flex;
  align-items: center;
  background: #fff;
  padding: 30px;
  border-radius: 10px;
  width: 90%;
  max-width: 1000px;
  max-height: 90%;
}

.preview-image-container {
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 800px;
  height: 600px;
  max-width: 100%;
  max-height: 100%;
}

.modal-preview-image {
  max-width: 100%;
  max-height: 100%;
  transition: transform 0.3s ease;
}

/* Stack buttons vertically */
#previewButtons {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-left: 40px;
}

/* Always show both zoom buttons */
#modalZoomIn,
#modalZoomOut {
  display: block !important;
}

.modal-btn {
  background-color: blue;
  color: white;
  border: none;
  padding: 20px 30px;
  border-radius: 5px;
  cursor: pointer;
  transition: opacity 0.2s ease;
  font-size: 1rem;
}

.modal-btn:hover {
  opacity: 0.8;
}
`;
document.head.appendChild(style);

// 2. Zoom state
let currentZoomLevel = 1;

// 3. Open preview modal and reset zoom
function previewImage(imgElem) {
  const modal = document.getElementById('previewModal');
  const modalImg = document.getElementById('previewModalImage');

  modalImg.src = imgElem.src;
  currentZoomLevel = 1;
  modalImg.style.transform = 'scale(1)';
  modal.style.display = 'flex';
}

// 4. Close modal
function closePreviewModal() {
  document.getElementById('previewModal').style.display = 'none';
}

// 5. Zoom In
function zoomIn() {
  if (currentZoomLevel < 3) {
    currentZoomLevel += 0.2;
    document
      .getElementById('previewModalImage')
      .style.transform = \`scale(\${currentZoomLevel})\`;
  }
}

// 6. Zoom Out
function zoomOut() {
  if (currentZoomLevel > 1) {
    currentZoomLevel = Math.max(1, currentZoomLevel - 0.2);
    document
      .getElementById('previewModalImage')
      .style.transform = \`scale(\${currentZoomLevel})\`;
  }
}

// 7. Wire up buttons once DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  document
    .getElementById('modalClose')
    .addEventListener('click', closePreviewModal);

  document
    .getElementById('modalEdit')
    .addEventListener('click', () =>
      editImage(document.getElementById('previewModalImage').src)
    );

  document
    .getElementById('modalZoomIn')
    .addEventListener('click', zoomIn);

  document
    .getElementById('modalZoomOut')
    .addEventListener('click', zoomOut);
});
