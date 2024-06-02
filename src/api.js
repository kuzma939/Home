import axios from 'axios';
axios.defaults.baseURL = 'https://api.unsplash.com';
const API_KEY = 'rpElGEJiM1diG-ZBgj2Ap4jD7oscLZ7fagH2g9O1l20'; 

async function fetchImages(query, page) {
  const response = await axios.get('/search/photos', {
    params: {  
        client_id: API_KEY,  
         query,
        page,
         },
  });
  console.log(response);
  return response.data;
}

export { fetchImages };