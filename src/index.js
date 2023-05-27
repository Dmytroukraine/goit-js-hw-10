
// import Notiflix from 'notiflix';
// import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

// const refs = {
//   boxCat: document.querySelector('.cat-info'),
//   select: document.querySelector('.breed-select'),
//   loader: document.querySelector('.loader-span'),
// };

// refs.select.addEventListener('input', selectCat);

// fetchBreeds()
//   .then(r => {
//     const markupOptions = r
//       .map(cat => {
//         return `<option value="${cat.id}">${cat.name}</option>\n`;
//       })
//       .join('');

//     refs.select.insertAdjacentHTML('beforeend', markupOptions);
//   })
//   .catch(error => {
//     Notiflix.Notify.failure(`Error fetch API, ${error}`);
//   });

// function selectCat(e) {
//   refs.boxCat.innerHTML = '';
//   const loader = '<span class="loader"></span>';

//   refs.boxCat.insertAdjacentHTML('beforeend', loader);

//   const catId = e.target.value;

//   fetchCatByBreed(catId)
//     .then(cat => {
//       refs.boxCat.innerHTML = '';

//       const kitty = cat[0].breeds[0];
//       const markupCat = `
//               <img width="400" src="${cat[0].url}" alt="cat" />
//               <div class="description-cat">
//                 <h1>${kitty.name}</h1>
//                 <p>${kitty.description}</p>
//                 <p><h2>Temperament:</h2>${kitty.temperament}</p>
//               </div>`;

//       refs.boxCat.insertAdjacentHTML('beforeend', markupCat);
//     })
//     .catch(error => {
//       Notiflix.Notify.failure(`Error fetch API, ${error}`);
//     });
// }





import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';


const breedSelect = document.querySelector('select');
const catInfo = document.querySelector('.cat-info');

breedSelect.addEventListener('change', onSelectChange)


Notiflix.Loading.pulse('Loading data, please wait...');

fetchBreeds()
    .then(breeds => {
        Notiflix.Loading.remove();
        breedSelect.classList.remove('is-hidden');
        breedSelectMarkup(breeds);
        new SlimSelect({
            select: breedSelect,
        });
    })
    .catch(error => {
        onFetchError(error);
        Notiflix.Loading.remove();
    });

function breedSelectMarkup(breeds) {
  breedSelect.innerHTML = breeds
    .map(breed => `<option value="${breed.value}">${breed.name}</option>`)
    .join('');
}

function onSelectChange(e) {
    Notiflix.Loading.pulse('Loading data, please wait...')
    const breedId = e.currentTarget.value;
    fetchCatByBreed(breedId)
        .then(cat => {
            renderCatCard(cat);
            Notiflix.Loading.remove();
            catInfo.classList.remove('is-hidden')
        })
        .catch(error => {
            onFetchError(error);
            Notiflix.Loading.remove();
        })
};

function renderCatCard(cat) {
    catInfo.innerHTML = '';
    const html = `
              <img src="${cat.url}" alt="A cute cat">
              <div>
              <h2>${cat.breeds[0].name}</h2>
              <p>${cat.breeds[0].description}</p>
              <p><strong>Temperament:</strong> ${cat.breeds[0].temperament}</p>
              </div>
            `;
            catInfo.insertAdjacentHTML('beforeend', html);
}
          
function onFetchError(error) {
    Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!')
}
