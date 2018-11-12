function getNodeIds(node, result = []) {
  if (node.id) {
    node.id.forEach(item => result.push(item));
  }

  Object.keys(node).forEach((key) => {
    if (key !== 'data' && key !== 'id') {
      getNodeIds(node[key], result);
    }
  });

  return result;
}

module.exports = getNodeIds;
