const grid = document.querySelector('.grid');
let gridSize = 16;

// Function to generate the grid dynamically
function generateGrid(size) {
  grid.innerHTML = ''; // Clear any existing grid
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement('div');
    cell.dataset.index = i; // Assign an index to each cell
    cell.style.backgroundColor = '#fff'; // Default white background
    cell.style.border = '1px solid #ccc'; // Cell border for visibility
    grid.appendChild(cell);
  }
}

// Initialize the grid on page load
generateGrid(gridSize);
