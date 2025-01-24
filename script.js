const grid = document.querySelector('.grid');
const gridSizeSelector = document.getElementById('gridSize');
const uploadButton = document.getElementById('uploadButton');
const uploadImage = document.getElementById('uploadImage');
const undoButton = document.getElementById('undo');
const redoButton = document.getElementById('redo');
const colorPicker = document.getElementById('colorPicker');
const saveColorButton = document.getElementById('saveColor');
const reducedColorsContainer = document.getElementById('reducedColors');
let currentColor = colorPicker.value;
let gridSize = 16;
let history = [];
let redoStack = [];
let reducedColors = []; // To hold reduced colors globally

// Generate grid dynamically
function generateGrid(size) {
  gridSize = size;
  grid.innerHTML = '';
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement('div');
    cell.dataset.index = i;
    cell.style.backgroundColor = '#fff';
    grid.appendChild(cell);

    cell.addEventListener('click', () => {
      saveToHistory();
      cell.style.backgroundColor = currentColor;
    });
  }
}

// Save current grid state to history
function saveToHistory() {
  const gridState = Array.from(grid.children).map(cell => cell.style.backgroundColor);
  history.push(gridState);
  redoStack = [];
}

// Undo functionality
undoButton.addEventListener('click', () => {
  if (history.length > 0) {
    const lastState = history.pop();
    redoStack.push(Array.from(grid.children).map(cell => cell.style.backgroundColor));
    applyGridState(lastState);
  }
});

// Redo functionality
redoButton.addEventListener('click', () => {
  if (redoStack.length > 0) {
    const nextState = redoStack.pop();
    saveToHistory();
    applyGridState(nextState);
  }
});

// Apply a grid state
function applyGridState(state) {
  Array.from(grid.children).forEach((cell, i) => {
    cell.style.backgroundColor = state[i];
  });
}

// Handle color picker changes
colorPicker.addEventListener('input', e => {
  currentColor = e.target.value;
});

// Handle image upload
uploadButton.addEventListener('click', () => uploadImage.click());

uploadImage.addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = event => {
    const img = new Image();
    img.src = event.target.result;
    img.onload = () => {
      processImageWithoutReduction(img);
    };
  };
  reader.readAsDataURL(file);
});

// Process image: Resize to grid size and display original colors in the grid
function processImageWithoutReduction(img) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = gridSize;
  canvas.height = gridSize;

  ctx.drawImage(img, 0, 0, gridSize, gridSize);
  const imageData = ctx.getImageData(0, 0, gridSize, gridSize);

  Array.from(grid.children).forEach((cell, i) => {
    const r = imageData.data[i * 4];
    const g = imageData.data[i * 4 + 1];
    const b = imageData.data[i * 4 + 2];
    cell.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
  });

  reducedColors = quantizeImage(imageData, 16);
  displayReducedColors(reducedColors);
}

// Display reduced colors below the grid
function displayReducedColors(colors) {
  reducedColorsContainer.innerHTML = '';
  colors.forEach((color, index) => {
    const colorBox = document.createElement('div');
    colorBox.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
    colorBox.textContent = index + 1;
    colorBox.className = 'color-box';
    reducedColorsContainer.appendChild(colorBox);
  });
}

// Quantize image to reduce to a fixed number of colors
function quantizeImage(imageData, numColors) {
  const { data } = imageData;
  const colorMap = new Map();
  for (let i = 0; i < data.length; i += 4) {
    const colorKey = `${data[i]},${data[i + 1]},${data[i + 2]}`;
    if (!colorMap.has(colorKey) && colorMap.size < numColors) {
      colorMap.set(colorKey, [data[i], data[i + 1], data[i + 2]]);
    }
  }
  return Array.from(colorMap.values());
}

// Export grid to Grayscale PNG with numbering
document.getElementById('exportGray').addEventListener('click', () => {
  const canvas = document.createElement('canvas');
  canvas.width = gridSize * 20;
  canvas.height = gridSize * 20;
  const ctx = canvas.getContext('2d');

  Array.from(grid.children).forEach((cell, i) => {
    const x = (i % gridSize) * 20;
    const y = Math.floor(i / gridSize) * 20;
    const color = cell.style.backgroundColor || 'rgb(255, 255, 255)';
    const index = reducedColors.findIndex(
      c => `rgb(${c[0]}, ${c[1]}, ${c[2]})` === color
    ) + 1;

    // Calculate grayscale value
    const [r, g, b] = reducedColors[index - 1] || [255, 255, 255];
    const grayscale = Math.round((r + g + b) / 3);
    ctx.fillStyle = `rgb(${grayscale}, ${grayscale}, ${grayscale})`;
    ctx.fillRect(x, y, 20, 20);

    // Draw the number
    ctx.fillStyle = '#000';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(index, x + 10, y + 10);
  });

  const link = document.createElement('a');
  link.download = 'grayscale_with_numbers.png';
  link.href = canvas.toDataURL();
  link.click();
});

// Initialize the app
generateGrid(gridSize);
