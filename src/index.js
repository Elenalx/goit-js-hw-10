import { Notify } from 'notiflix';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';

import './css/styles.css';


const DEBOUNCE_DELAY = 300;

let inputValue = '';

const refs = {
  inputRef: document.querySelector('#search-box'),
  listRef: document.querySelector('.country-list'),
  countryInfoRef: document.querySelector('.country-info'),
};
refs.inputRef.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));


    
    function onInput(e) {
  e.preventDefault();
  inputValue = refs.inputRef.value.trim();
  if (inputValue === '') {
    clearInput();
    return;
  }
    

  fetchCountries(inputValue)
    .then(countries => {
      if (countries.length === 1) {
        clearInput();
        renderCountryTitle(countries);
        renderCountryInfo(countries);
      } else if (countries.length > 1 && countries.length <= 10) {
        clearInput();
        renderCountryTitle(countries);
      } else if (countries.length > 10) {
        clearInput();
        Notify.info(
          'Too many mathces found. Please enter a more spesific name',
          { timeout: 100, cssAnimationDuration: 1000 }
        );
      }
    })
    .catch(catchError);
}


function renderCountryTitle(countries) {
  const markup = countries
    .map(country => {
      return `<li class="country-item">
      <img class='country-img' src="${country.flags.svg}" alt="flag">
      <p class="country-name">${country.name.official}</p>
    </li>`;
    })
    .join('');
  refs.listRef.insertAdjacentHTML('beforeend', markup);
}

function renderCountryInfo(countries) {
  const langs = countries.map(({ languages }) => Object.values(languages).join(', '));
  const markup = countries
    .map(country => {
      return `<p class="info-text">Capital: <span class="value">${country.capital}</span></p>
      <p class="info-text">Population: <span class="value">${country.population}</span></p>
      <p class="info-text">languages: <span class="value">${langs}</span></p>`;
    })
    .join('');
  refs.countryInfoRef.insertAdjacentHTML('beforeend', markup);
}

function clearInput() {
  refs.listRef.innerHTML = '';
  refs.countryInfoRef.innerHTML = '';
}
function catchError() {
  clearInput();
  Notify.failure('Oops, there is no country with that name', {
    timeout: 100,
    cssAnimationDuration: 1000,
  });
}