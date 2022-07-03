import React, { Component } from "react";
import "./QuickpathVisualizer.css";
import Node from "./Node/Node";

export default class QuickpathVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: [],
    };
  } // constructor

  componentDidMount() {
    const nodes = [];

    for (let row = 0; row < 20; row += 1) {
      const rowCurrent = [];
      for (let column = 0; column < 50; column += 1) {
        const nodeCurrent = {
          column,
          row,
          isStart: row === 10 && column === 5,
          isFinish: row === 10 && column === 45,
        }; // object for each node
        rowCurrent.push(nodeCurrent);
      }
      nodes.push(rowCurrent);
    } // for loop row

    this.setState({ nodes });
  } // componentDidMount

  render() {
    const { nodes } = this.state;
    console.trace(nodes);

    // Warning: Each child in a list should have a unique "key" prop.
    return (
      <div className="grid">
        {nodes.map((row, rowIdx) => {
          return (
            <div key={rowIdx}>
              {row.map((node, nodeIdx) => {
                const { isStart, isFinish } = node;

                return (
                  <Node
                    key={nodeIdx}
                    isStart={isStart}
                    isFinish={isFinish}
                    test={"foo"}
                  ></Node>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
} // class QuickpathVisualizer
