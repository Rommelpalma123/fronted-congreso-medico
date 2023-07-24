import Axios from 'axios';

export const postAxios = (url, data, headers = {}) => {
  return new Promise((resolve, reject) => {
    Axios.post(url, data, { headers: { ...headers } })
      .then((result) => resolve(result.data))
      .catch((err) => reject(err));
  });
};

export const getAxios = (url, headers = {}) => {
  return new Promise((resolve, reject) => {
    Axios.get(url, { headers: { ...headers } })
      .then((result) => resolve(result.data))
      .catch((err) => reject(err));
  });
};

export const putAxios = (url, data, headers = {}) => {
  return new Promise((resolve, reject) => {
    Axios.put(url, data, { headers: { ...headers } })
      .then((result) => resolve(result.data))
      .catch((err) => reject(err));
  });
};

export const deleteAxios = (url, headers = {}) => {
  return new Promise((resolve, reject) => {
    Axios.delete(url, { headers: { ...headers } })
      .then((result) => resolve(result.data))
      .catch((err) => reject(err));
  });
};
