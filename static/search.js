const search = document.getElementById('search');

console.log(search);

search.addEventListener('input', () => {
  fetch('/search', { cache: 'no-cache' })
    .then(result => result.json())
    .then(value => console.log(value));
});

console.dir(search);
