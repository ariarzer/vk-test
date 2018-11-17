const fakerRU = require('faker/locale/ru');
const fakerENG = require('faker/locale/en_US');

const ru = {};

const gen = (generator) => {
  const key = `id${generator.random.number({ min: 100000000, max: 999999999 })}`;
  ru[key] = {
    personalName: generator.name.firstName(),
    familyName: generator.name.lastName(),
    meta: generator.address.state(),
    avatar: generator.fake('https://picsum.photos/50/50?image={{random.number(1084)}}'),
  };
};

for (let i = 0; i < 8000; i += 1) {
  if (fakerENG.random.boolean()) {
    gen(fakerENG);
  } else {
    gen(fakerRU);
  }
}

console.log(JSON.stringify(ru));
