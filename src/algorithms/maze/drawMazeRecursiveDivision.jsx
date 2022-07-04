export function drawMazeRecursiveDivision(
  grid,
  type,
  rowStart,
  rowEnd,
  colStart,
  colEnd,
  orientation,
  adjacentWalls
) {
  if (rowEnd < rowStart || colEnd < colStart) return;

  if (!adjacentWalls) {
    // let relevantIds = [node.isStart, node.isFinish];
    grid.forEach((row) =>
      row.forEach((node) => {
        // console.log(node);
        // console.dir(node.column);
        if (!node.isStart && !node.isFinish) {
          // let row = parseInt(node.id.split("-")[0]); // let col = parseInt(node.id.split("-")[1]);

          let row = node.row;
          let col = node.column;
          let gridHeight = grid.length - 1;
          let gridWidth = grid[0].length - 1;

          if (
            row === 0 ||
            col === 0 ||
            row === gridHeight ||
            col === gridWidth
          ) {
            // console.log("ok"); // 136 - count out of 1000
            if (type === "wall") {
              node.className = "node node-wall";
              node.isWall = true;
              node.weight = 0;
            } else if (type === "weight") {
              node.isVisited = false;
              node.weight = 15;
            }
          } // if condition is for drawing the largest edges
        }
      })
    );
    adjacentWalls = true;
  }

  if (orientation === "horizontal") {
    let rows = []; // chance to have rows
    for (let number = rowStart; number <= rowEnd; number += 2) {
      rows.push(number);
    }
    let cols = [];
    for (let number = colStart - 1; number <= colEnd + 1; number += 2) {
      cols.push(number);
    }

    let rowRandomIndex = Math.floor(Math.random() * rows.length);
    let colsRandomIndex = Math.floor(Math.random() * cols.length);
    let rowCurrent = rows[rowRandomIndex];
    let colCurrent = cols[colsRandomIndex];

    grid.forEach((row) =>
      row.forEach((node) => {
        let row = node.row;
        let col = node.column;
        // console.log(node);
        if (
          row === rowCurrent &&
          col !== colCurrent &&
          col >= colStart - 1 &&
          col <= colEnd + 1
        ) {
          // console.log(node);
          if (!node.isStart && !node.isFinish) {
            if (type === "wall") {
              node.className = "node node-wall";
              node.isWall = true;
              node.weight = 0;
            } else if (type === "weight") {
              node.isVisited = false;
              node.weight = 15;
            }
          }
        }
      })
    );

    if (rowCurrent - 2 - rowStart > colEnd - colStart) {
      console.trace('#1 - if');
      console.count('#1 - if');
      drawMazeRecursiveDivision( grid, type, rowStart, rowCurrent - 2, colStart, colEnd, orientation, adjacentWalls); // prettier-ignore
    } else {
      console.trace('#1 - else');
      console.count('#1 - else');
      drawMazeRecursiveDivision( grid, type, rowStart, rowCurrent - 2, colStart, colEnd, "vertical", adjacentWalls);
    } // prettier-ignore

    if (rowEnd - (rowCurrent + 2) > colEnd - colStart) {
      console.trace("#2 - if");
      console.count("#2 - if");
      drawMazeRecursiveDivision( grid, type, rowCurrent + 2, rowEnd, colStart, colEnd, orientation, adjacentWalls); // prettier-ignore
    } else {
      console.trace("#2 - else");
      console.count("#2 - else");
      drawMazeRecursiveDivision( grid, type, rowCurrent + 2, rowEnd, colStart, colEnd, "vertical", adjacentWalls); // prettier-ignore
    }
    // end of if (orientation === 'horizontal')
  } else {
    let rows = []; // chance to have rows
    for (let number = rowStart - 1; number <= rowEnd + 1; number += 2) {
      rows.push(number);
    }
    let cols = [];
    for (let number = colStart; number <= colEnd; number += 2) {
      cols.push(number);
    }

    let rowRandomIndex = Math.floor(Math.random() * rows.length);
    let colsRandomIndex = Math.floor(Math.random() * cols.length);
    let rowCurrent = rows[rowRandomIndex];
    let colCurrent = cols[colsRandomIndex];

    grid.forEach((row) =>
      row.forEach((node) => {
        let row = node.row;
        let col = node.column;
        // console.log(node);
        if (
          row !== rowCurrent &&
          col === colCurrent &&
          row >= rowStart - 1 &&
          row <= rowEnd + 1
        ) {
          if (node.isStart && node.isFinish) {
            if (type === "wall") {
              node.isWall = true;
              node.weight = 0;
            } else if (type === "weight") {
              node.isVisited = false;
              node.weight = 15;
            }
          }
        }
      })
    );

    if (rowEnd - rowStart > colCurrent - 2 - colStart) {
      drawMazeRecursiveDivision( grid, type, rowStart, rowEnd, colStart, colCurrent - 2, "horizontal", adjacentWalls); // prettier-ignore

    } else {
      drawMazeRecursiveDivision( grid, type, rowStart, rowEnd, colStart, colCurrent - 2, orientation, adjacentWalls);
    } // prettier-ignore

    if (rowEnd - rowStart > colEnd - (colCurrent + 2)) {
      drawMazeRecursiveDivision( grid, type, rowStart, rowEnd, colCurrent + 2, colEnd, "horizontal", adjacentWalls); // prettier-ignore
    } else {
      drawMazeRecursiveDivision( grid, type, rowStart, rowEnd, colCurrent + 2, colEnd, orientation, adjacentWalls); // prettier-ignore
    }
    // end of else (orientation !== 'horizontal')
  }
}
