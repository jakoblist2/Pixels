const canvas = document.getElementById('pixelCanvas');
const ctx = canvas.getContext('2d');
const canvasSize = 256;
const gridSize = 16;

canvas.width = canvasSize;
canvas.height = canvasSize;

let currentTool = 'brush';
let currentColor = '#000000';
let grid = [];

// Initialize the grid
for (let y = 0; y < gridSize; y++) {
    let row = [];
    for (let x = 0; x < gridSize; x++) {
        row.push('#ffffff'); // Default white color
    }
    grid.push(row);
}

// Draw the grid
function drawGrid() {
    const cellSize = canvasSize / gridSize;
    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            ctx.fillStyle = grid[y][x];
            ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
    }
}

drawGrid();

// Event listeners for tools
document.getElementById('brushTool').addEventListener('click', () => currentTool = 'brush');
document.getElementById('eraserTool').addEventListener('click', () => currentTool = 'eraser');
document.getElementById('colorFillerTool').addEventListener('click', () => currentTool = 'colorFiller');
document.getElementById('eyedropperTool').addEventListener('click', () => currentTool = 'eyedropper');
document.getElementById('colorPicker').addEventListener('input', (e) => currentColor = e.target.value);

canvas.addEventListener('click', (e) => {
    const cellSize = canvasSize / gridSize;
    const x = Math.floor(e.offsetX / cellSize);
    const y = Math.floor(e.offsetY / cellSize);
    
    if (currentTool === 'brush') {
        grid[y][x] = currentColor;
    } else if (currentTool === 'eraser') {
        grid[y][x] = '#ffffff';
    }
    // Implement other tools here...

    drawGrid();
});

const brightnessSlider = document.getElementById('brightness');
const contrastSlider = document.getElementById('contrast');

brightnessSlider.addEventListener('input', updateImage);
contrastSlider.addEventListener('input', updateImage);

function updateImage() {
    const brightness = parseInt(brightnessSlider.value);
    const contrast = parseInt(contrastSlider.value);
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const adjustedData = applyBrightnessContrast(imageData, brightness, contrast);
    ctx.putImageData(adjustedData, 0, 0);
}

function applyBrightnessContrast(imageData, brightness, contrast) {
    const data = imageData.data;
    const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
    
    for (let i = 0; i < data.length; i += 4) {
        data[i] += brightness;     
        data[i + 1] += brightness;
        data[i + 2] += brightness;
        
        data[i] = factor * (data[i] - 128) + 128;
        data[i + 1] = factor * (data[i + 1] - 128) + 128;
        data[i + 2] = factor * (data[i + 2] - 128) + 128;
    }
    return imageData;
}

// Initial draw to ensure sliders work on the existing grid
drawGrid();
updateImage();