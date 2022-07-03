import React from "react";
import "./App.css";

import QuickpathVisualizer from "./Quickpath/QuickpathVisualizer";

function App() {
  return (
    <div className="App">
      <QuickpathVisualizer></QuickpathVisualizer>
    </div>
  );
}

export default App;

/**
 * @Initialize App
 * Import QuickpathVisualizer component
 * Import Node into QuickpathVisualizer
 *
 * @Draw Grid with table component HTML elements
 * Use nodes to array and push O(n) nodes into currentRow -
 * ... inline 2 for loops
 * Map each item to a row a <Node> is inserted into...
 */
