import { exportImage, exportColorList } from './export.js';

const canvas = document.getElementById('pixelCanvas');
const ctx = canvas.getContext('2d');
const canvasSize = 256;
let gridSize = 16;

canvas.width = canvasSize;
canvas.height = canvasSize;

let currentTool = 'brush';
let currentColor = '#000000';
let grid = [];
let history = [];
let redoStack = [];

// Initialize the grid
function initializeGrid(size) {
    grid = [];
    for (let y = 0; y < size; y++) {
        let row = [];
        for (let x = 0; x < size; x++) {
            row.push('#ffffff'); // Default white color
        }
        grid.push(row);
    }
    drawGrid();
}

// Draw the grid
function drawGrid() {
    const cellSize = canvas.width / gridSize;
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            ctx.fillStyle = grid[y][x];
            ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            ctx.strokeStyle = '#d3d3d3'; // Light gray for grid lines
            ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
    }
}

// Save the current state to history for undo functionality
function saveHistory() {
    history.push(JSON.parse(JSON.stringify(grid)));
    if (history.length > 50) history.shift(); // Limit history size
}

// Set up event listeners
document.getElementById('brushTool').addEventListener('click', () => {
    currentTool = 'brush';
    console.log('Brush tool selected');
});
document.getElementById('eraserTool').addEventListener('click', () => {
    currentTool = 'eraser';
    console.log('Eraser tool selected');
});
document.getElementById('colorFillerTool').addEventListener('click', () => {
    currentTool = 'colorFiller';
    console.log('Color Filler tool selected');
});
document.getElementById('eyedropperTool').addEventListener('click', () => {
    currentTool = 'eyedropper';
    console.log('Eyedropper tool selected');
});
document.getElementById('undoTool').addEventListener('click', undo);
document.getElementById('redoTool').addEventListener('click', redo);
document.getElementById('colorPicker').addEventListener('input', (e) => {
    currentColor = e.target.value;
    console.log(`Color selected: ${currentColor}`);
});
document.getElementById('gridSize').addEventListener('input', (e) => {
    gridSize = parseInt(e.target.value);
    initializeGrid(gridSize);
});
document.getElementById('loadImage').addEventListener('change', (e) => loadImage(e.target.files[0]));
document.getElementById('exportColor').addEventListener('click', () => exportImage(grid, canvasSize, gridSize, false));
document.getElementById('exportGrayscale').addEventListener('click', () => exportImage(grid, canvasSize, gridSize, true));
document.getElementById('exportColorList').addEventListener('click', () => exportColorList(grid));

canvas.addEventListener('click', (e) => {
    const cellSize = canvas.width / gridSize;
    const x = Math.floor(e.offsetX / cellSize);
    const y = Math.floor(e.offsetY / cellSize);

    if (currentTool === 'brush') {
        grid[y][x] = currentColor;
    } else if (currentTool === 'eraser') {
        grid[y][x] = '#ffffff';
    } else if (currentTool === 'colorFiller') {
        // Implement color fill functionality
    } else if (currentTool === 'eyedropper') {
        currentColor = grid[y][x];
        document.getElementById('colorPicker').value = currentColor;
    }

    saveHistory();
    drawGrid();
});

function undo() {
    if (history.length > 0) {
        redoStack.push(grid);
        grid = history.pop();
        drawGrid();
    }
}

function redo() {
    if (redoStack.length > 0) {
        history.push(grid);
        grid = redoStack.pop();
        drawGrid();
    }
}

// Load image function
function loadImage(file) {
    const reader = new FileReader();
    reader.onload = function (event) {
        const img = new Image();
        img.onload = function () {
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = gridSize;
            tempCanvas.height = gridSize;
            const tempCtx = tempCanvas.getContext('2d');
            tempCtx.drawImage(img, 0, 0, gridSize, gridSize);

            const imageData = tempCtx.getImageData(0, 0, gridSize, gridSize);
            for (let y = 0; y < gridSize; y++) {
                for (let x = 0; x < gridSize; x++) {
                    const index = (y * gridSize + x) * 4;
                    const r = imageData.data[index];
                    const g = imageData.data[index + 1];
                    const b = imageData.data[index + 2];
                    const hexColor = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
                    grid[y][x] = hexColor;
                }
            }
            drawGrid();
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
}

// Initial setup
initializeGrid(gridSize);
drawGrid();