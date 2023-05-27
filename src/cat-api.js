// const API_KEY =
//   'live_W2AEs8RTVOBvDUsaLZNKQrQZXkXlIHW0X4Eg712NIBm7aQnnX49SGcNBFe9bM6Js';

// const catApiUrl = 'https://api.thecatapi.com/v1/breeds';
// const catApiImageUrl = 'https://api.thecatapi.com/v1/images';

// function fetchBreeds() {
//   return fetch(`${catApiUrl}/?api_key=${API_KEY}`).then(r => r.json());
// }

// function fetchCatByBreed(catId) {
//   return fetch(
//     `${catApiImageUrl}/search?breed_ids=${catId}&api_key=${API_KEY}`
//   ).then(response => response.json());
// }

// export { fetchBreeds, fetchCatByBreed };


const BASE_URL = 'https://api.thecatapi.com/v1'
const API_KEY = 'live_tOJmP1g79vmtI5Ge64CbuUmmk0rX3vegnncRIyI4DcDXMn635avs4IBSHIaAHhVk';

const options = {
  headers: {
    'x-api-key':
      API_KEY,
  },
};

export function fetchBreeds() {
  return fetch(`${BASE_URL}/breeds`, options)
    .then(response => response.json())
    .then(data => data.map(breed => ({ value: breed.id, name: breed.name })))
        .catch(error => console.log(error));
    
}

export function fetchCatByBreed(breedId) {
    return fetch(`${BASE_URL}/images/search?breed_ids=${breedId}`, options)
        .then(response => {
            return response.json()
        })
        .then(data => {
            console.log(data)
            return data[0]
        })
    .catch(error => console.log(error))
}