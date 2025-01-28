import React from 'react';
import Grid from './components/Grid';

const App = () => {
  return (
    <div className="app">
      <h1>Pixel-Editor-App</h1>
      <Grid rows={16} columns={16} pixelSize={16} spacing={1} />
    </div>
  );
};

export default App;