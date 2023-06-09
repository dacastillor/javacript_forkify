// Aqui van funciones que se utilizan una y otra vez dentro de la app

import { TIMEOUT_SEC } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    // sólo ejecuta un error si el TimeOut se cumple
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function(url, uploadData = undefined){
  try{
    const fetchPro = uploadData ?
    fetch(url,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData)
    }): fetch(url);

    const recipeAPI = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]); // evalua lo primero que pase si el fetch o el timer de 10 segundos
    const recipeData = await recipeAPI.json();
    if (!recipeAPI.ok)
      throw new Error(`Error: ${recipeData.message} ${recipeAPI.status}`);
    return recipeData;

  } catch (error) {
    throw error;
  }
}

// export const getJSON = async function (url) {
//   try {
//     const recipeAPI = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]); // evalua lo primero que pase si el fetch o el timer de 10 segundos
//     const recipeData = await recipeAPI.json();
//     if (!recipeAPI.ok)
//       throw new Error(`Error: ${recipeData.message} ${recipeAPI.status}`);
//     return recipeData;
//   } catch (error) {
//     throw error;
//   }
// };

// export const sendJSON = async function (url, uploadData) {
//   try {
//     const fetchPro = fetch(url,{
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(uploadData)
//     })
//     const recipeAPI = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]); // evalua lo primero que pase si el fetch o el timer de 10 segundos
//     const recipeData = await recipeAPI.json();
//     if (!recipeAPI.ok)
//       throw new Error(`Error: ${recipeData.message} ${recipeAPI.status}`);
//     return recipeData;
//   } catch (error) {
//     throw error;
//   }
// };


// const timeout = function (s) {
//     return new Promise(function (_, reject) {
//       setTimeout(function () {
//         reject(new Error(`Request took too long! Timeout after ${s} second`));
//       }, s * 1000);
//     });
//   };
