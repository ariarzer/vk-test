const dummyjson = require('dummy-json');

const template = `
{
  {{#repeat 7001}}
  "id{{int 111111111 999999999}}": {
    "personalName": "{{firstName}}",
    "familyName": "{{lastName}}",
    "meta": "{{city}}, {{street}}",
    "avatar": "img{{@index}}.png"
  },
  {{/repeat}}
}`;

console.log(dummyjson.parse(template));
