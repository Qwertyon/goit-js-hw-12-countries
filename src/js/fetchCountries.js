import { data } from 'autoprefixer';
import countriesListTpl from '../templates/countries-list.hbs';
import countryInformationTpl from '../templates/country-information.hbs';
import '@pnotify/core/dist/BrightTheme.css';
import { error, defaults } from '@pnotify/core';

defaults.closer = false;
defaults.sticker = false;
defaults.high = '20px';
defaults.width = '300px';

const inputOfCountryName = document.querySelector('.js-country-name');
const countryListRef = document.querySelector('.js-country-list');
const countryInformationRef = document.querySelector('.js-country-information');

const fetchCountries = searchQuery => {
  const nameOfCountry = searchQuery;

  const url = `https://restcountries.eu/rest/v2/name/${nameOfCountry}`;

  fetch(url)
    .then(responce => responce.json())
    .then(data => {
      const markup = countriesListTpl(data);
      const aboutMarkup = countryInformationTpl(data);
      countryListRef.innerHTML = '';
      countryInformationRef.innerHTML = '';
      if (data.length > 10) {
        const myError = error({
          text: 'Too many matches found. Please enter a more specific query!',
        });
        return;
      }
      if (data.length > 1) {
        countryListRef.insertAdjacentHTML('beforeend', markup);
        return;
      }
      if (data.length === 1) {
        countryInformationRef.insertAdjacentHTML('beforeend', aboutMarkup);
      }
    })
    .catch(error => console.log(error));
};

const debouncedEnterCountryName = _.debounce(event => {
  event.preventDefault();
  fetchCountries(event.target.value);
  if (event.target.value === '') {
    countryListRef.innerHTML = '';
    countryInformationRef.innerHTML = '';
  }
}, 500);

inputOfCountryName.addEventListener('input', debouncedEnterCountryName);
