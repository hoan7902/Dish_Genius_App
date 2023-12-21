import axios from './axiosInstance';

export const getListFood = async (searchQuery: string) => {
  try {
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
    console.log('check payload: ', payload);
    const res = await axios.patch('user/edit-profile', payload);
    console.log('check res: ', res);
    return res.data;
  } catch (error) {
    console.error('Error getUserProfile in:', error);
    throw error;
  }
};
