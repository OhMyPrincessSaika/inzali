import axios from "axios";

// const headers :  {
//     'X-RapidAPI-Key': '5cb7ab908amshe8d464a49000c09p1a1bdejsn3729a41141a3',
//     'X-RapidAPI-Host': 'bayut.p.rapidapi.com'
//   }
  export const baseUrl = 'https://bayut.p.rapidapi.com'

  export const fetchApi = async (url) => {
    const {data} = await axios.get((url), {
         headers :  {
                'X-RapidAPI-Key': '5cb7ab908amshe8d464a49000c09p1a1bdejsn3729a41141a3',
                'X-RapidAPI-Host': 'bayut.p.rapidapi.com'
              }
    })
    return data;
  }