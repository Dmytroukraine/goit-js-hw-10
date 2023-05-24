import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const loaderElement = document.querySelector('.loader');
const errorElement = document.querySelector('.error');
const breedSelectElement = document.querySelector('.breed-select');
const catInfoContainerElement = document.querySelector('.cat-info-container');
const catImageElement = document.querySelector('.cat-image');
const catBreedElement = document.querySelector('.cat-breed');
const catDescriptionElement = document.querySelector('.cat-description');
const catTemperamentElement = document.querySelector('.cat-temperament');

// Helper function to show the loader element
function showLoader() {
  loaderElement.style.display = 'block';
}

// Helper function to hide the loader element
function hideLoader() {
  loaderElement.style.display = 'none';
}

// Helper function to show the error element
function showError() {
  errorElement.style.display = 'block';
}

// Helper function to hide the error element
function hideError() {
  errorElement.style.display = 'none';
}

// Helper function to show the cat information
function showCatInfo(cat) {
  catImageElement.src = cat.url;
  catBreedElement.textContent = cat.breeds[0].name;
  catDescriptionElement.textContent = cat.breeds[0].description;
  catTemperamentElement.textContent = `Temperament: ${cat.breeds[0].temperament}`;

  catInfoContainerElement.style.display = 'block';
}

// Helper function to hide the cat information
function hideCatInfo() {
  catInfoContainerElement.style.display = 'none';
}

// Fetch and populate the breed select options
function populateBreeds() {
  showLoader();

  fetchBreeds()
    .then(breeds => {
      breeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.textContent = breed.name;
        breedSelectElement.appendChild(option);
      });

      hideLoader();
      breedSelectElement.style.display = 'block';
    })
    .catch(error => {
      hideLoader();
      showError();
      console.error(error);
    });
}

// Fetch and display cat information based on the selected breed
function fetchAndDisplayCatInfo(breedId) {
  showLoader();
  hideCatInfo();

  fetchCatByBreed(breedId)
    .then(cats => {
      if (cats.length > 0) {
        const cat = cats[0];
        showCatInfo(cat);
      } else {
        throw new Error('No cat found for the selected breed.');
      }

      hideLoader();
    })
    .catch(error => {
      hideLoader();
      showError();
      console.error(error);
    });
}

// Event listener for breed select change
breedSelectElement.addEventListener('change', event => {
  const selectedBreedId = event.target.value;
  fetchAndDisplayCatInfo(selectedBreedId);
});

// Initialize the app
populateBreeds();