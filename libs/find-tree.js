const correctingLayout = require('./correcting-layout');
const transliterate = require('./transliterate');

class FindTree {
  constructor(wordList, treeRoot = { data: '' }) {
    Object.keys(wordList).forEach((key) => {
      const letters = wordList[key].toLowerCase().split('');

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

  find(praseCase, wordlist) {
    const prase = praseCase.toLowerCase();
    return this.unique([
      ...this.findPhrase(prase, wordlist),
      ...this.findPhrase(correctingLayout(prase), wordlist),
      ...this.findPhrase(transliterate(prase), wordlist),
      ...this.findPhrase(transliterate(prase, true), wordlist),
      ...this.findPhrase(transliterate(correctingLayout(prase)), wordlist),
      ...this.findPhrase(transliterate(correctingLayout(prase), true), wordlist),
    ]);
  }

  findPhrase(phraseCase, wordList) {
    const phrase = phraseCase.toLowerCase();

    if (phrase.split(' ').length === 1) {
      try {
        return this.findWord(phrase, wordList);
      } catch (e) {
        if (e.message === 'not found') {
          return [];
        }
      }
    }

    let finds;
    try {
      finds = phrase.split(' ').map(item => this.findWord(item, wordList));
    } catch (e) {
      if (e.message === 'not found') {
        return [];
      }
    }

    const result = [];

    finds.forEach((item, index, all) => {
      item.forEach((key) => {
        if (all[index + 1] && all[index + 1].includes(key)) {
          result.push(key);
        }
      });
    });

    return this.unique(result);
  }

  findWord(word) {
    let result = [];

    const letters = word.split('');

    let curNode = this.tree;

    letters.forEach((symbol, index, all) => {
      if (curNode[symbol] === undefined) {
        throw new Error('not found');
      }

      if (symbol === all[all.length - 1]) {
        result = this.getNodeIds(curNode[symbol]);
      }

      curNode = curNode[symbol];
      return 0;
    });

    return this.unique(result);
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

  unique(arr) {
    return arr.filter((value, index, self) => self.indexOf(value) === index);
  }
}

module.exports = FindTree;
