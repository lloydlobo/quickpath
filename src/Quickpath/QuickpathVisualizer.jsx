import React, { Component } from "react";
import Node from "./Node/Node";
import {
  dijkstra,
  getNodesInShortestPathOrder,
} from "../algorithms/weighted/dijkstraAlgo";

import "./QuickpathVisualizer.css";
import { drawMazeRecursiveDivision } from "../algorithms/maze/drawMazeRecursiveDivision";

import { drawMazeStairs } from "../algorithms/maze/drawMazeStairs";
// GLOBAL VARIABLES
const NODE_ROW_START = 10;
const NODE_COLUMN_START = 15;
const NODE_ROW_FINISH = 10;
const NODE_COLUMN_FINISH = 35;

export default class QuickpathVisualizer extends Component {
  mouseIsPressed;
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
    };
  } // constructor

  componentDidMount() {
    const grid = getGridInitial();
    this.setState({ grid });
  }

  handleMouseDown(row, column) {
    const newGrid = getNewGridWithToggledWalls(this.state.grid, row, column);
    this.setState({ grid: newGrid, mouseIsPressed: true });
  }

  handleMouseEnter(row, column) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGridWithToggledWalls(this.state.grid, row, column);
    this.setState({ grid: newGrid });
  }

  handleMouseUp() {
    this.setState({ mouseIsPressed: false });
  }

  animateSelectedAlgorithm(nodesVisitedInSequence, nodesInShortestPathOrder) {
    for (let i = 0; i <= nodesVisitedInSequence.length; i += 1) {
      if (i === nodesVisitedInSequence.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i); // re-renders every 10 * i time units
        return;
      }
      setTimeout(() => {
        const node = nodesVisitedInSequence[i];
        document.getElementById(`node-${node.row}-${node.column}`).className =
          "node node-visited";
      }, 10 * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i += 1) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.column}`).className =
          "node node-shortest-path";
      }, 50 * i);
    }
  }

  visualizeShortestPath() {
    const { grid } = this.state;
    const nodeStart = grid[NODE_ROW_START][NODE_COLUMN_START];
    const nodeFinish = grid[NODE_ROW_FINISH][NODE_COLUMN_FINISH];

    const nodesVisitedInSequence = dijkstra(grid, nodeStart, nodeFinish);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(nodeFinish);

    this.animateSelectedAlgorithm(
      nodesVisitedInSequence,
      nodesInShortestPathOrder
    );
  }

  createMaze(type) {
    const { grid } = this.state;
    let random = Math.random();
    console.log(random);

    const nodes = getAllNodes(grid);
    nodes.forEach((node) => {
      // console.log(node);
      let mainClassNames = ["node-start", "node-finish", "node-visited"];
      let randomTwo = type === "wall" ? 0.25 : 0.35;
      // console.log(random, randomTwo);
      if (random < randomTwo && !mainClassNames.includes(node.className)) {
        if (type === "wall") {
          node.className = "node node-wall";
          node.isWall = true;
          node.weight = 0;
        } else if (type === "weight") {
          node.className = "node node-not-visited weight";
          node.isWeight = true;
          node.weight = 15;
        }
      }
    });
  }

  generateMaze(type) {
    const { grid } = this.state;
    if (type === "stair") {
      drawMazeStairs(grid);
    }
    if (type === "recursive-division") {
      console.log("recursive-division");
      drawMazeRecursiveDivision(
        grid,
        "wall",
        2,
        grid.length - 3,
        2,
        grid[0].length - 3,
        "horizontal",
        false
      );
      // recursiveDivisionMaze(this, 2, this.height - 3, 2, this.width - 3, "horizontal", false, "wall");
      //
    }
  }

  render() {
    const { grid } = this.state;

    return (
      /* wrap in jsx fragment `<>`. jsx expressions have a parent element */

      <>
        <div className="visualize-button-wrapper">
          <label htmlFor="button-visualize">
            Use Dijkstra's Algorithm to find shortest path
          </label>
          <br></br>
          <button
            onClick={() => this.visualizeShortestPath()}
            id="button-visualize"
          >
            Visualize Quickpath
          </button>
        </div>
        <div className="visualize-button-maze">
          <label htmlFor="button-maze">Generate maze</label>
          <br></br>
          <button
            onClick={() => {
              // this.createMaze("wall");
              this.generateMaze("recursive-division");
            }}
            id="button-maze"
          >
            Generate Maze & Walls
          </button>
        </div>
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const { row, column, isStart, isFinish, isWall } = node;
                  // Warning: Each child in a list should have a unique "key" prop.
                  return (
                    <Node
                      key={nodeIdx}
                      column={column}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      mouseIsPressed={this.mouseIsPressed}
                      onMouseDown={(row, column) =>
                        this.handleMouseDown(row, column)
                      }
                      onMouseEnter={(row, column) =>
                        this.handleMouseEnter(row, column)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                      row={row}
                    ></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
} // class QuickpathVisualizer

const getGridInitial = () => {
  const grid = [];
  for (let row = 0; row < 20; row += 1) {
    const rowCurrent = [];
    for (let column = 0; column < 50; column += 1) {
      rowCurrent.push(createNode(column, row));
    }
    grid.push(rowCurrent);
  }
  return grid;
};

const createNode = (column, row) => {
  return {
    column,
    row,
    isStart: row === NODE_ROW_START && column === NODE_COLUMN_START,
    isFinish: row === NODE_ROW_FINISH && column === NODE_COLUMN_FINISH,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    nodePrevious: null,
  };
};

const getNewGridWithToggledWalls = (grid, row, column) => {
  const newGrid = grid.slice();
  const node = newGrid[row][column];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };

  newGrid[row][column] = newNode;

  return newGrid;
};
const getAllNodes = (grid) => {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
};
