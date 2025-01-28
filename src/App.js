const canvas = document.getElementById('pixelCanvas');
const ctx = canvas.getContext('2d');
let gridSize = 16;

canvas.width = 256;
canvas.height = 256;

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

initializeGrid(gridSize);

// Draw the grid
function drawGrid() {
    const cellSize = canvas.width / gridSize;
    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            ctx.fillStyle = grid[y][x];
            ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
    }
}

// Save the current state to history for undo functionality
function saveHistory() {
    history.push(JSON.parse(JSON.stringify(grid)));
    if (history.length > 50) history.shift(); // Limit history size
}

// Event listeners for tools
document.getElementById('brushTool').addEventListener('click', () => currentTool = 'brush');
document.getElementById('eraserTool').addEventListener('click', () => currentTool = 'eraser');
document.getElementById('colorFillerTool').addEventListener('click', () => currentTool = 'colorFiller');
document.getElementById('eyedropperTool').addEventListener('click', () => currentTool = 'eyedropper');
document.getElementById('undoTool').addEventListener('click', undo);
document.getElementById('redoTool').addEventListener('click', redo);
document.getElementById('colorPicker').addEventListener('input', (e) => currentColor = e.target.value);
document.getElementById('gridSize').addEventListener('input', (e) => {
    gridSize = parseInt(e.target.value);
    initializeGrid(gridSize);
});

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

initializeGrid(gridSize);

// Draw the grid
function drawGrid() {
    const cellSize = canvas.width / gridSize;
    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            ctx.fillStyle = grid[y][x];
            ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
    }
}

// Save the current state to history for undo functionality
function saveHistory() {
    history.push(JSON.parse(JSON.stringify(grid)));
    if (history.length > 50) history.shift(); // Limit history size
}

// Event listeners for tools
document.getElementById('brushTool').addEventListener('click', () => currentTool = 'brush');
document.getElementById('eraserTool').addEventListener('click', () => currentTool = 'eraser');
document.getElementById('colorFillerTool').addEventListener('click', () => currentTool = 'colorFiller');
document.getElementById('eyedropperTool').addEventListener('click', () => currentTool = 'eyedropper');
document.getElementById('undoTool').addEventListener('click', undo);
document.getElementById('redoTool').addEventListener('click', redo);
document.getElementById('colorPicker').addEventListener('input', (e) => currentColor = e.target.value);
document.getElementById('gridSize').addEventListener('input', (e) => {
    gridSize = parseInt(e.target.value);
    initializeGrid(gridSize);
});

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

// Event listeners for export buttons
document.getElementById('exportColor').addEventListener('click', () => exportImage(grid, canvasSize, gridSize, false));
document.getElementById('exportGrayscale').addEventListener('click', () => exportImage(grid, canvasSize, gridSize, true));
document.getElementById('exportColorList').addEventListener('click', () => exportColorList(grid));
