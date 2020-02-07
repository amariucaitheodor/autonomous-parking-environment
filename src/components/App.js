import React from 'react';
import ParkingGroup from './ParkingGroup'
import './App.css';
import { Stage, Layer } from "react-konva";

function App() {
  var spacesTotal = 10;
  var spacesAvailable = new Array(spacesTotal).fill(0);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Parking Lot Monitor
        </p>
        <Stage width={window.innerWidth} height={window.innerHeight}>
          <Layer>
            <ParkingGroup
              offset={{ x: 30, y: 30 }}
              size={15}
              spacesAvailable={spacesAvailable} />
          </Layer>
        </Stage>
      </header>
    </div>
  );
}

export default App;
