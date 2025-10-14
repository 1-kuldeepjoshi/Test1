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
  flex-direction: column;
  align-items: center;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 700px;
  max-height: 90%;
}

.preview-image-container {
  width: 600px;
  height: 400px;
  max-width: 100%;
  max-height: 100%;
  overflow: hidden;
  position: relative;
  cursor: grab;
  margin-bottom: 20px;
}

.modal-preview-image {
  user-select: none;
  max-width: 100%;
  max-height: 100%;
  transition: transform 0.3s ease;
  will-change: transform;
}

#previewButtons {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 15px;
  width: 100%;
  justify-content: center;
}

#modalZoomIn,
#modalZoomOut {
  display: block !important;
}

.modal-btn {
  background-color: blue;
  color: white;
  border: none;
  padding: 12px 20px;
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

// 2. State for zoom & pan
let currentZoomLevel = 1;
let currentTranslateX = 0;
let currentTranslateY = 0;
let isDragging = false;
let dragStartX = 0;
let dragStartY = 0;

// 3. Apply transform (scale + translate)
function updateTransform() {
  const img = document.getElementById('previewModalImage');
  img.style.transform = 
    `translate(${currentTranslateX}px, ${currentTranslateY}px) scale(${currentZoomLevel})`;
}

// 4. Open preview modal and reset zoom/pan
function previewImage(imgElem) {
  const modal = document.getElementById('previewModal');
  const modalImg = document.getElementById('previewModalImage');
  modalImg.src = imgElem.src;
  currentZoomLevel = 1;
  currentTranslateX = 0;
  currentTranslateY = 0;
  updateTransform();
  modal.style.display = 'flex';
}

// 5. Close modal
function closePreviewModal() {
  document.getElementById('previewModal').style.display = 'none';
}

// 6. Zoom In
function zoomIn() {
  if (currentZoomLevel < 3) {
    currentZoomLevel += 0.2;
    updateTransform();
  }
}

// 7. Zoom Out
function zoomOut() {
  if (currentZoomLevel > 1) {
    currentZoomLevel = Math.max(1, currentZoomLevel - 0.2);
    // reset pan when fully zoomed out
    if (currentZoomLevel === 1) {
      currentTranslateX = 0;
      currentTranslateY = 0;
    }
    updateTransform();
  }
}

// 8. Pan/drag logic
const container = document.querySelector('.preview-image-container');

container.addEventListener('mousedown', e => {
  if (currentZoomLevel <= 1) return;
  isDragging = true;
  container.style.cursor = 'grabbing';
  dragStartX = e.clientX - currentTranslateX;
  dragStartY = e.clientY - currentTranslateY;
});

window.addEventListener('mousemove', e => {
  if (!isDragging) return;
  currentTranslateX = e.clientX - dragStartX;
  currentTranslateY = e.clientY - dragStartY;
  updateTransform();
});

window.addEventListener('mouseup', () => {
  if (!isDragging) return;
  isDragging = false;
  container.style.cursor = 'grab';
});

// Touch support
container.addEventListener('touchstart', e => {
  if (currentZoomLevel <= 1) return;
  isDragging = true;
  const touch = e.touches[0];
  dragStartX = touch.clientX - currentTranslateX;
  dragStartY = touch.clientY - currentTranslateY;
});

window.addEventListener('touchmove', e => {
  if (!isDragging) return;
  const touch = e.touches[0];
  currentTranslateX = touch.clientX - dragStartX;
  currentTranslateY = touch.clientY - dragStartY;
  updateTransform();
});

window.addEventListener('touchend', () => {
  isDragging = false;
});

// 9. Wire up buttons once DOM is ready
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
