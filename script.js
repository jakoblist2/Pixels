// Define the color map
const colorMap = {
  1: '#000000',  // Black
  2: '#00FFFF',  // Cyan
  3: '#5B3A29',  // Brown
  4: '#FFD700',  // Yellow
  5: '#FFA500',  // Orange
  6: '#0000FF',  // Blue
  7: '#A9A9A9',  // Gray
  8: '#808080',  // Dark Gray
  9: '#FF0000',  // Red
  10: '#FFFFFF', // White
  11: '#C0C0C0', // Silver
  12: '#8B4513', // Saddle Brown
  13: '#FF1493', // Pink
  14: '#32CD32'  // Lime Green
};

// Generate a random color value from the map
const getRandomColor = () => {
  const keys = Object.keys(colorMap);
  return colorMap[keys[Math.floor(Math.random() * keys.length)]];
};

// Generate the grid dynamically
const generateGrid = (size) => {
  const grid = document.getElementById('grid');
  grid.innerHTML = ''; // Clear previous grid
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement('div');
    cell.classList.add('grid-cell');
    cell.style.backgroundColor = getRandomColor();
    grid.appendChild(cell);
  }
};

// Event listener for the "Generate Grid" button
document.getElementById('generateGrid').addEventListener('click', () => {
  const gridSize = parseInt(document.getElementById('gridSize').value, 10);
  generateGrid(gridSize);
});

// Generate default grid on page load
window.onload = () => {
  generateGrid(16);
};
