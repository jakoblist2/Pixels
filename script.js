const grid = document.querySelector('.grid');
const reducedColorsContainer = document.getElementById('reducedColors');
let gridSize = 16;
let reducedColors = []; // Hold reduced colors globally

// Improved Grayscale Export
document.getElementById('exportGray').addEventListener('click', () => {
  const canvas = document.createElement('canvas');
  canvas.width = gridSize * 20;
  canvas.height = gridSize * 20;
  const ctx = canvas.getContext('2d');

  // Debug: Log reduced colors to verify mapping
  console.log("Reduced Colors:", reducedColors);

  // Map each cell to reduced colors
  Array.from(grid.children).forEach((cell, i) => {
    const x = (i % gridSize) * 20;
    const y = Math.floor(i / gridSize) * 20;
    const color = cell.style.backgroundColor || 'rgb(255, 255, 255)';
    const index = reducedColors.findIndex(
      c => `rgb(${c[0]}, ${c[1]}, ${c[2]})` === color
    ) + 1;

    if (index > 0) {
      const [r, g, b] = reducedColors[index - 1];
      const grayscale = Math.round((r + g + b) / 3); // Compute grayscale

      // Draw cell background in grayscale
      ctx.fillStyle = `rgb(${grayscale}, ${grayscale}, ${grayscale})`;
      ctx.fillRect(x, y, 20, 20);

      // Draw number in the cell
      ctx.fillStyle = grayscale > 128 ? '#000' : '#fff'; // Adjust text color for visibility
      ctx.font = '10px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(index, x + 10, y + 10);
    } else {
      // Default for cells with no matching reduced color
      ctx.fillStyle = '#fff';
      ctx.fillRect(x, y, 20, 20);
    }
  });

  // Download as PNG
  const link = document.createElement('a');
  link.download = 'grayscale_with_numbers_debugged.png';
  link.href = canvas.toDataURL();
  link.click();
});

// Initialize grid for testing
function generateGrid(size) {
  grid.innerHTML = '';
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement('div');
    cell.dataset.index = i;
    cell.style.backgroundColor = '#fff';
    grid.appendChild(cell);
  }
}

// Sample reduced colors for testing
reducedColors = [
  [0, 0, 0], [255, 255, 255], [128, 128, 128], [192, 192, 192],
  [64, 64, 64], [160, 160, 160], [96, 96, 96], [32, 32, 32],
  [200, 200, 200], [120, 120, 120], [80, 80, 80], [40, 40, 40],
  [220, 220, 220], [140, 140, 140], [60, 60, 60], [180, 180, 180]
];

generateGrid(gridSize);
