const API_URL = 'https://restcountries.com/v3.1/name/';

export function fetchCountries(name) {
  return fetch(
      `${API_URL}${name}?fields=name,capital,population,flags,languages`
).then(response => {
    console.log(response);
  });
}

// const BASE_URL = 'https://restcountries.com/v3.1/name/';
// // іменований експорт функції
// export function fetchCountries(name) {
//   return fetch(
//     `${BASE_URL}${name}?fields=name,capital,population,flags,languages`
//   ).then(response => {
//     console.log(response);
//   });
// }