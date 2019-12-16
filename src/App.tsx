import produce from 'immer';
import React, { useCallback, useRef, useState } from 'react';

const numRows = 50;
const numCols = 50;

const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0]
]

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
// store state running, setRunning currently at 'false'
const [running, setRunning] = useState(false);

const runningRef = useRef(running);
// current value of ref is the value of running
runningRef.current = running

// useCallback: does not recreate after every render
// empty array makes sure the fn is only called once
const runSimulation = useCallback(() => {
// kill condition
  if (!runningRef.current) {
    return;
  }

// double for loops
setGrid((g) => {
  return produce(g, gridCopy => {
    for (let i = 0; i < numRows; i++) {
      for (let k = 0; k < numCols; k++) {
        let neighbors = 0;
        if (gridCopy[i][k + 1] === 1) {
          neighbors += 1;
        }

      }
    }
  })
})
  // simulate
  setTimeout(runSimulation, 1000);
}, [])

  return (
    <>
    <button
    onClick={() => {
      setRunning(!running);
    }}>

      {running ? "stop" : "start"}

    </button>
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
  // turns clicked grid pink or white if clicked again
        gridCopy[i][k] = grid[i][k] ? 0 : 1;
      })
      setGrid(newGrid)
    }}
    style={{ width: 20,
      height: 20, backgroundColor: grid[i][k] ? 'pink' : undefined,
      border: 'solid 1px black'
    }} />)
  )}
  </div>
  </>
  )
}

export default App;
