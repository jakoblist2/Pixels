const grid = document.querySelector('.grid');
let gridSize = 16;

// Function to generate the grid dynamically
function generateGrid(size) {
  console.log("Generating grid with size:", size); // Debug log
  grid.innerHTML = ''; // Clear any existing grid
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement('div');
    cell.dataset.index = i; // Assign an index to each cell
    cell.style.backgroundColor = '#fff'; // Default white background
    cell.style.border = '1px solid #ccc'; // Cell border for visibility
    cell.style.width = '100%'; // Ensure cells fill the grid space
    cell.style.height = '100%'; // Ensure cells fill the grid space
    grid.appendChild(cell);
  }

  console.log("Grid generated:", grid); // Debug log to verify grid content
}

// Initialize the grid on page load
generateGrid(gridSize);
