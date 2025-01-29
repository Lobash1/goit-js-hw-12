import axios from 'axios';

export const fetchPhotosByQuery = (searchedQuery, currentPage) => {
  const axiosOptions = {
    params: {
      q: searchedQuery,
      key: '48348047-29f6f569c2c15fdf8af3c5251',
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: currentPage,
      per_page: 15,
    },
  };
  return axios.get(`https://pixabay.com/api/`, axiosOptions);
};
