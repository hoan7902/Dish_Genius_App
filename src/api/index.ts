import axios from './axiosInstance';

export const getListFood = async (searchQuery: string) => {
  try {
    const res = await axios.get('dishes', {
      params: {
        q: searchQuery || 'chicken',
        page: 1,
        limit: 10,
      },
    });
    return res.data.data.results;
  } catch (error) {
    console.error('Error fetching dishes:', error);
    throw error;
  }
};