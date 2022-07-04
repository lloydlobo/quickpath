export function drawMazeStairs(grid) {
  const gridHeight = grid.length; // 20
  const gridWidth = grid[0].length; // 50

  // console.log(gridHeight, gridWidth);
  let relevantStatuses = ["node-start", "node-finish", "node-visited"];

  let idXCurrent = gridHeight - 1;
  let idYCurrent = 0;

  for (let row = 0; row < gridHeight - 1; row += 1) {
    for (let column = 0; column < gridWidth; column += 1) {
      if (idXCurrent > 0 && idYCurrent < gridWidth) {
        let nodeCurrent = grid[idXCurrent][idYCurrent];
        // console.log(row, column);
        if (
          !nodeCurrent.isWall &&
          !relevantStatuses.includes(nodeCurrent.className)
        ) {
          // console.log(idXCurrent, idYCurrent);
          nodeCurrent.isWall = true;
          nodeCurrent.className = `node node-wall`;
        }
      }
    }
    idXCurrent -= 1;
    idYCurrent += 1;
  }

  for (let row = 0; row < gridHeight - 1; row += 1) {
    for (let column = 0; column < gridWidth; column += 1) {
      if (idXCurrent < gridHeight - 2 && idYCurrent < gridWidth) {
        let nodeCurrent = grid[idXCurrent][idYCurrent];
        // console.log(row, column);
        if (
          !nodeCurrent.isWall &&
          !relevantStatuses.includes(nodeCurrent.className)
        ) {
          // console.log(idXCurrent, idYCurrent);
          nodeCurrent.isWall = true;
          nodeCurrent.className = `node node-wall`;
        }
      }
    }
    idXCurrent += 1;
    idYCurrent += 1;
  }

  for (let row = 0; row < gridHeight - 1; row += 1) {
    for (let column = 0; column < gridWidth; column += 1) {
      if (idXCurrent > 0 && idYCurrent < gridWidth - 1) {
        let nodeCurrent = grid[idXCurrent][idYCurrent];
        // console.log(row, column);
        if (
          !nodeCurrent.isWall &&
          !relevantStatuses.includes(nodeCurrent.className)
        ) {
          // console.log(idXCurrent, idYCurrent);
          nodeCurrent.isWall = true;
          nodeCurrent.className = `node node-wall`;
        }
      }
    }
    idXCurrent -= 1;
    idYCurrent += 1;
  }
}
