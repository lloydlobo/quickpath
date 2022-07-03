import React, { Component } from "react";

import "./Node.css";

export default class Node extends Component {
  constructor(props) {
    super(props); // always call super first
    this.state = {};
  }

  render() {
    return <div className="node"></div>;
  }
}
