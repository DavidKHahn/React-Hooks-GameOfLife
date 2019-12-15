import React, { useState } from 'react';
import produce from 'immer'

const numRows = 50;
const numCols = 50;

const App: React.FC = () => {
  const [grid, setGrid] = useState(() => {

    const rows = [];
    for(let i = 0; i < numRows; i++) {
      // initialize an Array of '0's
      // 2nd param is a fn setting all values inside array to be 0
      rows.push(Array.from(Array(numCols), () => 0));
    }

    return rows;
  });

  console.log(grid);

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${numCols}, 20px)`
    }}
    >
    {grid.map((rows, i) =>
    rows.map((col, k) =>
    <div
    key={`${i}-${k}`}
    onClick={() => {
  // immer's produce will make an immutable change and generate a new grid for use
      const newGrid = produce(grid, gridCopy => {
        gridCopy[i][k] = 1;
      })
      setGrid(newGrid)
    }}
    style={{ width: 20,
      height: 20, backgroundColor: grid[i][k] ? 'pink' : undefined,
      border: 'solid 1px black'
    }} />)
  )}
  </div>
  )
}

export default App;
