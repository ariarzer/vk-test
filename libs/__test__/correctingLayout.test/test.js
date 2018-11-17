const corerctingLayout = require('../../correctingLayout');

test('for correcting layout', () => {
  expect(corerctingLayout('z dcz nfrfz cnhjrf')).toEqual('я вся такая строка');
});

test('for correcting layout', () => {
  expect(corerctingLayout('я вся такая строка')).toEqual('z dcz nfrfz cnhjrf');
});
