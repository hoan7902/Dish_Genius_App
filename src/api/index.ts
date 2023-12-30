import axios from './axiosInstance';

export const getListFood = async (searchQuery: string) => {
  try {
    console.log({searchQuery});
    const res = await axios.get('dishes', {
      params: {
        q: searchQuery || '',
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

export const signIn = async (email: string, password: string) => {
  try {
    const res = await axios.post('user/login', {
      email,
      password,
    });
    console.log('Response:', res.data);
    return res.data;
  } catch (error) {
    console.error('Error signIn in:', error);
    return undefined;
  }
};

export const signUp = async (email: string, password: string) => {
  try {
    const res = await axios.post('user/register', {
      email,
      password,
    });
    console.log('Response:', res.data);
    return res.data;
  } catch (error) {
    console.error('Error signUp in:', error);
    return undefined;
  }
};

export const getUserProfile = async () => {
  try {
    const res = await axios.get('user/info');
    console.log('Response:', res.data);
    return res.data;
  } catch (error) {
    console.error('Error getUserProfile in:', error);
    throw error;
  }
};

export const updateUserProfile = async (payload: any) => {
  try {
    const res = await axios.patch('user/edit-profile', payload);
    // console.log('check res: ', res);
    return res.data;
  } catch (error) {
    console.error('Error getUserProfile in:', error);
    return undefined;
  }
};

export const updateUserPassword = async (payload: any) => {
  try {
    console.log('check payload updateUserPassword: ', payload);
    const res = await axios.patch('user/change-password', payload);
    // console.log('check res: ', res);
    return res.data;
  } catch (error) {
    console.error('Error updateUserPassword in:', error);
    return undefined;
  }
};

export const getFavouriteDishIds = async () => {
  try {
    const res = await axios.get('my-favorite-dish-ids');
    // console.log('check res: ', res);
    return res.data;
  } catch (error) {
    console.error('Error getFavouriteDishIds in:', error);
    throw error;
  }
};

export const addFavouriteDishById = async (id: any) => {
  try {
    const res = await axios.post(`dish/favorite/${id}`);
    // console.log('check res: ', res);
    return res.data;
  } catch (error) {
    console.error('Error addFavouriteDishById in:', error);
    throw error;
  }
};

export const removeFavouriteDishById = async (id: any) => {
  try {
    const res = await axios.delete(`dish/favorite/${id}`);
    // console.log('check res: ', res);
    return res.data;
  } catch (error) {
    console.error('Error removeFavouriteDishById in:', error);
    throw error;
  }
};

export const getDishById = async (id: any) => {
  try {
    const res = await axios.get(`dish/${id}`);
    // console.log('check res: ', res);
    return res.data;
  } catch (error) {
    console.error('Error getFavouriteDishIds in:', error);
    throw error;
  }
};

export const getListIngredients = async (formData: any) => {
  try {
    console.log(formData);
    const res = await axios.post('detect-ingredients', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Cần set Content-Type là multipart/form-data khi gửi hình ảnh
      },
    });
    // console.log('check res: ', res);
    return res.data;
  } catch (error) {
    console.error('Error getListIngredients in:', error);
    throw error;
  }
};
