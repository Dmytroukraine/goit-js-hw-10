// export function fetchBreeds() {
//     return fetch('https://api.thecatapi.com/v1/breeds')
//       .then(response => response.json())
//       .then(data => data)
//       .catch(error => {
//         throw error;
//       });
//   }
  
//   export function fetchCatByBreed(breedId) {
//     return fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
//       .then(response => response.json())
//       .then(data => data)
//       .catch(error => {
//         throw error;
//       });
//   }

// const BREEDS_URL = 'https://api.thecatapi.com/v1/breeds';
// const API_KEY =
//   'live_P2Spxc1aBtbpL0qSmUXZGLjJn7MNbol18Wj7A0liYsyvJzqeNmL2lGZTrxZnladk';

// function fetchBreeds() {
//   const params = new URLSearchParams({
//     api_key: API_KEY,
//   });
//   return fetch(`${BREEDS_URL}?${params}`)
//     .then(response => {
//       console.log(response);
//       if (!response.ok) {
//         throw new Error(response.status);
//       }
//       return response.json();
//     })
//     .catch(error => console.log(error));
// }

// export { fetchBreeds };


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