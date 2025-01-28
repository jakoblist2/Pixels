const { initializeGrid } = require('../app.js');

test('initializeGrid should create a grid with default white color', () => {
  const gridSize = 16;
  const grid = initializeGrid(gridSize);

  expect(grid.length).toBe(gridSize);
  for (let row of grid) {
    expect(row.length).toBe(gridSize);
    for (let cell of row) {
      expect(cell).toBe('#ffffff'); // Default white color
    }
  }
});