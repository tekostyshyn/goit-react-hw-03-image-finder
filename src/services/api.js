import axios from 'axios';

const KEY = '8210264-2ea871c1a05460bb4aaa242b8';
axios.defaults.baseURL = 'https://pixabay.com/api';

export const searchPictures = async (searchQuery, pageNumber) => {
  const response = await axios.get(
    `?q=${searchQuery}&page=${pageNumber}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );

  return response.data
};
