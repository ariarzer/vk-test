const getNodeIds = require('./getNodeIds.js');

function find(TREE, wordList, word) {
  let result = '';

  const letters = word.split('');

  let curNode = TREE;

  letters.forEach((symbol, index, all) => {
    if (curNode[symbol] === undefined) {
      return 'not found';
    }

    if (symbol === all[all.length - 1]) {
      result = getNodeIds(curNode[symbol]).map(item => wordList[item]);
    }

    curNode = curNode[symbol];
    return 0;
  });

  return result;
}

module.exports = find;
