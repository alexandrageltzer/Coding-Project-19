import React from 'react';
import Gallery from './Gallery';
import './App.css';

function App() {
  return (
    <div className="App">
      <img src={`${process.env.PUBLIC_URL}/plane.jpg`} alt="Plane" className="plane-image" />
      <h1>Tour Comparison</h1>
      <Gallery />
    </div>
  );
}

export default App;

