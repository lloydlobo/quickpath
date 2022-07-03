import React, { Component } from "react";
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

    for (let row = 0; row < 15; row += 1) {
      const rowCurrent = [];
      for (let column = 0; column < 50; column += 1) {
        rowCurrent.push([]);
      }
      nodes.push(rowCurrent);
    } // for loop row

    this.setState(nodes);
  } // componentDidMount

  render() {
    const { nodes } = this.state;
    console.trace(nodes);

    return (
      <div className="grid">
        {nodes.map((row, rowIdx) => {
          return (
            <div>
              {row.map((node, nodeIdx) => (
                <Node></Node>
              ))}
              {/* create a node for each row mapped items */}
            </div>
          );
        })}
      </div>
    );
  }
} // class QuickpathVisualizer
