const { applyBrightnessContrast } = require('../app.js');

test('applyBrightnessContrast should adjust brightness and contrast', () => {
  const imageData = {
    data: [100, 100, 100, 255, 150, 150, 150, 255], // Example pixel data
    width: 2,
    height: 1,
  };
  const brightness = 50;
  const contrast = 50;

  const adjustedData = applyBrightnessContrast(imageData, brightness, contrast);

  // Check if brightness and contrast adjustments are applied correctly
  expect(adjustedData.data[0]).toBeGreaterThan(100);
  expect(adjustedData.data[1]).toBeGreaterThan(100);
  expect(adjustedData.data[2]).toBeGreaterThan(100);
  expect(adjustedData.data[4]).toBeGreaterThan(150);
  expect(adjustedData.data[5]).toBeGreaterThan(150);
  expect(adjustedData.data[6]).toBeGreaterThan(150);
});