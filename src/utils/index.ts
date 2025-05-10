const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message;
  return String(error);
};

const traverseTree = <T extends { children?: T[] }>(
  nodes: T[],
  callback: (node: T, parentNode?: T) => void,
  parentNode?: T,
) => {
  for (const node of nodes) {
    callback(node, parentNode);
    if (node.children?.length) {
      traverseTree(node.children, callback, node);
    }
  }
};

const findTreeNode = <T extends { id: string; children?: T[] }>(
  nodes: T[],
  id: string,
  parentNode?: T,
) => {
  for (const node of nodes) {
    if (node.id === id) {
      return [node, parentNode];
    }
    if (node.children?.length) {
      return findTreeNode(node.children, id, node);
    }
  }
  return [];
};

export { getErrorMessage, traverseTree, findTreeNode };
