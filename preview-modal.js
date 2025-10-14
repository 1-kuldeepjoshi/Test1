let currentZoomLevel = 1;

// Open preview modal with selected image
function previewImage(imgElem) {
  const modal = document.getElementById("previewModal");
  const modalImg = document.getElementById("previewModalImage");
  modalImg.src = imgElem.src;
  currentZoomLevel = 1;
  modalImg.style.transform = "scale(1)";
  modal.style.display = "flex";
}

// Close preview modal
function closePreviewModal() {
  document.getElementById("previewModal").style.display = "none";
}

// Zoom In
function zoomIn() {
  if (currentZoomLevel < 3) {
    currentZoomLevel += 0.2;
    document.getElementById("previewModalImage").style.transform = `scale(${currentZoomLevel})`;
  }
  if (currentZoomLevel > 1)
    document.getElementById("modalZoomOut").style.display = "block";
}

// Zoom Out
function zoomOut() {
  if (currentZoomLevel > 1) {
    currentZoomLevel -= 0.2;
    if (currentZoomLevel < 1) currentZoomLevel = 1;
    document.getElementById("previewModalImage").style.transform = `scale(${currentZoomLevel})`;
  }
  if (currentZoomLevel === 1)
    document.getElementById("modalZoomOut").style.display = "none";
}

// Setup modal buttons when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("modalClose")?.addEventListener("click", closePreviewModal);
  document.getElementById("modalEdit")?.addEventListener("click", () =>
    editImage(document.getElementById("previewModalImage").src)
  );
  document.getElementById("modalZoomIn")?.addEventListener("click", zoomIn);
  document.getElementById("modalZoomOut")?.addEventListener("click", zoomOut);
});
