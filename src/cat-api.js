const API_KEY =
  'live_W2AEs8RTVOBvDUsaLZNKQrQZXkXlIHW0X4Eg712NIBm7aQnnX49SGcNBFe9bM6Js';

const catApiUrl = 'https://api.thecatapi.com/v1/breeds';
const catApiImageUrl = 'https://api.thecatapi.com/v1/images';

function fetchBreeds() {
  return fetch(`${catApiUrl}/?api_key=${API_KEY}`).then(r => r.json());
}

function fetchCatByBreed(catId) {
  return fetch(
    `${catApiImageUrl}/search?breed_ids=${catId}&api_key=${API_KEY}`
  ).then(response => response.json());
}

export { fetchBreeds, fetchCatByBreed };