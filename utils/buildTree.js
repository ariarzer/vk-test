function buildTree(wordList, treeRoot = { data: '' }) {
  Object.keys(wordList).forEach((key) => {
    const letters = wordList[key].split('');

    let curNode = treeRoot;

    letters.forEach((symbol, _, all) => {
      if (curNode[symbol] === undefined) {
        curNode[symbol] = { data: symbol };
      }
      if (symbol === all[all.length - 1]) {
        if (curNode[symbol].id) {
          curNode[symbol].id.push(key);
        } else {
          curNode[symbol].id = [key];
        }
      }
      curNode = curNode[symbol];
    });
  });

  return treeRoot;
}

module.exports = buildTree;
