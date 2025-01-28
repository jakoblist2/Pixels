// export.js
export function exportImage(grid, canvasSize, gridSize, grayscale = false) {
    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = canvasSize;
    exportCanvas.height = canvasSize;
    const exportCtx = exportCanvas.getContext('2d');

    const cellSize = canvasSize / gridSize;
    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            let color = grid[y][x];
            if (grayscale) {
                const rgb = parseInt(color.slice(1), 16);
                const r = (rgb >> 16) & 0xff;
                const g = (rgb >> 8) & 0xff;
                const b = (rgb >> 0) & 0xff;
                const gray = Math.round((r + g + b) / 3);
                color = `#${((1 << 24) + (gray << 16) + (gray << 8) + gray).toString(16).slice(1)}`;
            }
            exportCtx.fillStyle = color;
            exportCtx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
    }

    const link = document.createElement('a');
    link.download = grayscale ? 'pixel_image_grayscale.png' : 'pixel_image_color.png';
    link.href = exportCanvas.toDataURL();
    link.click();
}

export function exportColorList(grid) {
    const colors = new Set();
    grid.forEach(row => row.forEach(color => colors.add(color)));

    const colorList = Array.from(colors).join('\n');
    const blob = new Blob([colorList], { type: 'text/plain' });
    const link = document.createElement('a');
    link.download = 'color_list.txt';
    link.href = URL.createObjectURL(blob);
    link.click();
}