// Get DOM elements
const colorPicker = document.getElementById('colorPicker');
const brushTool = document.getElementById('brushTool');
const eraserTool = document.getElementById('eraserTool');
const thicknessSlider = document.getElementById('thicknessSlider');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const saveButton = document.getElementById('saveButton');
const navigateButton = document.getElementById('navigateButton');

let lastX = 0;
let lastY = 0;
let isEraser = false;
let currentColor = '#000000';
let thickness = 25;
let drawingInProgress = false;

// Initialize canvas
function init() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.strokeStyle = currentColor;
  ctx.lineWidth = thickness;

  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', stopDrawing);
  canvas.addEventListener('mousedown', handleMouseDown);
  canvas.addEventListener('mouseout', stopDrawing);
}

// Drawing functions
function draw(event) {
  if (!drawingInProgress) return;

  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(event.offsetX, event.offsetY);
  ctx.stroke();

  [lastX, lastY] = [event.offsetX, event.offsetY];
}

function handleMouseDown(event) {
  drawingInProgress = true;
  [lastX, lastY] = [event.offsetX, event.offsetY];
}

function stopDrawing() {
  drawingInProgress = false;
}

// Event listeners
colorPicker.addEventListener('change', handleColor);
brushTool.addEventListener('click', handleBrush);
eraserTool.addEventListener('click', handleEraser);
thicknessSlider.addEventListener('input', handleThickness);
saveButton.addEventListener('click', saveDrawing);
navigateButton.addEventListener('click', navigateToSite);

// Event handling functions
function handleColor(event) {
  currentColor = event.target.value;
  ctx.strokeStyle = currentColor;
}

function handleBrush() {
  isEraser = false;
  ctx.globalCompositeOperation = 'source-over';
}

function handleEraser() {
  isEraser = true;
  ctx.globalCompositeOperation = 'destination-out';
}

function handleThickness(event) {
  thickness = event.target.value;
  ctx.lineWidth = thickness;
}

// Save drawing
function saveDrawing() {
  const link = document.createElement('a');
  link.download = 'drawing.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
}

// Navigate to another site
function navigateToSite() {
  window.location.href = 'http://localhost:64413/sap-app1#/'; // Replace with your desired URL
}

// Initialize the app
init();
