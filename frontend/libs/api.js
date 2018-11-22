export default function api(addres, params) {
  const getParams = Object.keys(params).map(item => `${item}=${params[item]}`).join('&');
  return fetch(`/api/v0/${addres}?${getParams}`, { cache: 'no-cache' })
    .then((result) => {
      if (!result.ok) {
        throw result.error;
      }
      return result.json();
    });
}
