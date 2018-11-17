function correctingLayout(str) {
  const replacerENG = {
    q: 'й',
    w: 'ц',
    e: 'у',
    r: 'к',
    t: 'е',
    y: 'н',
    u: 'г',
    i: 'ш',
    o: 'щ',
    p: 'з',
    '[': 'х',
    ']': 'ъ',
    a: 'ф',
    s: 'ы',
    d: 'в',
    f: 'а',
    g: 'п',
    h: 'р',
    j: 'о',
    k: 'л',
    l: 'д',
    ';': 'ж',
    "'": 'э',
    z: 'я',
    x: 'ч',
    c: 'с',
    v: 'м',
    b: 'и',
    n: 'т',
    m: 'ь',
    ',': 'б',
    '.': 'ю',
    '/': '.',
  };
  const replacerRU = {};
  Object.keys(replacerENG).forEach((key) => {
    replacerRU[replacerENG[key]] = key;
    return 0;
  });
  const string = str.toLowerCase().split('');
  const res = [];

  string.forEach((item) => {
    if (replacerENG[item]) {
      res.push(replacerENG[item]);
    } else if (replacerRU[item]) {
      res.push(replacerRU[item]);
    } else {
      res.push(item);
    }
  });

  return res.join('');
}

module.exports = correctingLayout;
