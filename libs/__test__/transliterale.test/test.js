const transliterate = require('../../transliterate');

const txt = 'Съешь ещё этих мягких французских булок, да выпей же чаю!';
const txtTR = 'S``esh` eshhyo e`tix myagkix franczuzskix bulok, da vy`pey zhe chayu!';

test('for transliterale ru->tr', () => {
  expect(transliterate(txt)).toEqual(txtTR);
});

test('for transliterate tr->ru', () => {
  expect(transliterate(txtTR, true)).toEqual(txt);
});
