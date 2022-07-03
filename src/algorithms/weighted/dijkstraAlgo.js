// Return each nods in the order they are visited
// Point the node towards the 'previous visited' node
// and leave a trace from the final node where the path finishes to start

export function dijkstra(grid, nodeStart, nodeFinish) {
  const nodesVisitedInSequence = [];
  nodeStart.distance = 0;
  const nodesNotVisited = getAllNodes(grid);

  while (!!nodesNotVisited.length) {
    sortAllNodesByDistance(nodesNotVisited);
    const nodeClosest = nodesNotVisited.shift(); // remove first item & return it
    // Skip the wall, when detected
    if (nodeClosest.isWall) continue;
    // Stop the loop when distance to closest node is Infinity
    // ... happens in case of being boxed in and trapped
    if (nodeClosest.distance === Infinity) return nodesVisitedInSequence;
    nodeClosest.isVisited = true;
    nodesVisitedInSequence.push(nodeClosest);
    if (nodeClosest === nodeFinish) return nodesVisitedInSequence;

    updateNeighborsNotVisited(nodeClosest, grid);
  }
}

const sortAllNodesByDistance = (nodesNotVisited) => {
  nodesNotVisited.sort(
    (nodePrevious, nodeCurrent) => nodePrevious.distance - nodeCurrent.distance
  );
};

const updateNeighborsNotVisited = (node, grid) => {
  const neighborsNotVisited = getNeighborsNotVisited(node, grid);
  for (const neighbor of neighborsNotVisited) {
    neighbor.distance = node.distance + 1;
    neighbor.nodePrevious = node;
  }
};

const getNeighborsNotVisited = (node, grid) => {
  const neighbors = [];
  const { column, row } = node;

  if (row > 0) neighbors.push(grid[row - 1][column]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][column]);

  if (column > 0) neighbors.push(grid[row][column - 1]);
  if (column < grid[0].length - 1) neighbors.push(grid[row][column + 1]); // use modulus here? sort matrix problem

  return neighbors.filter((neighbor) => !neighbor.isVisited);
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

// Look for shortest path from nodeFinish
// Catch is that it works when called after the function dijkstra()
export function getNodesInShortestPathOrder(nodeFinish) {
  const nodesInShortestPathOrder = [];

  let nodeCurrent = nodeFinish;

  while (nodeCurrent !== null) {
    // Elements to insert at the start of the array.
    // Inserts new elements at the start of an array,
    // and returns the new length of the array.
    nodesInShortestPathOrder.unshift(nodeCurrent);
    nodeCurrent = nodeCurrent.nodePrevious;
  }

  return nodesInShortestPathOrder;
}

// every nodes distance is set to infinity except the nodeStart (0 distance), when you get to closest node -> visit it -> update the neighbor nodes in all 4 directions direction to have current distance + 1
// so the 4 surrounding neighbor nodes have distance of 1 ==> keep doing this process
// future --> use `min-heap` for performance
