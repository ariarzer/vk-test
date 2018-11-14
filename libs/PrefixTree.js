class prefixTree {
  constructor(wordList, treeRoot = { data: '' }) {
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

    this.tree = treeRoot;
  }


  find(word, wordList) {
    const result = {};

    const letters = word.split('');

    let curNode = this.tree;

    letters.forEach((symbol, index, all) => {
      if (curNode[symbol] === undefined) {
        return 'not found';
      }

      if (symbol === all[all.length - 1]) {
        this.getNodeIds(curNode[symbol]).forEach((item) => {
          result[item] = wordList[item];
        });
      }

      curNode = curNode[symbol];
      return 0;
    });

    return result;
  }

  getNodeIds(node, result = []) {
    if (node.id) {
      node.id.forEach(item => result.push(item));
    }

    Object.keys(node).forEach((key) => {
      if (key !== 'data' && key !== 'id') {
        this.getNodeIds(node[key], result);
      }
    });

    return result;
  }
}

module.exports = prefixTree;
