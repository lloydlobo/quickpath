import React, { Component } from "react";
import Node from "./Node/Node";
import {
  dijkstra,
  getNodesInShortestPathOrder,
} from "../algorithms/weighted/dijkstraAlgo";

import "./QuickpathVisualizer.css";

// GLOBAL VARIABLES
const NODE_ROW_START = 10;
const NODE_COLUMN_START = 15;
const NODE_ROW_FINISH = 10;
const NODE_COLUMN_FINISH = 35;
export default class QuickpathVisualizer extends Component {
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
      });
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
