import axios from './axiosInstance';
import {LOG_MEAL_TOKEN, BASE_URL_LOG_MEAL} from '@env';

const logMealToken = LOG_MEAL_TOKEN;
const baseUrlLogMeal = BASE_URL_LOG_MEAL;

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
    console.error('Error getDishById in:', error);
    throw error;
  }
};

export const getKeyLogMeal = async () => {
  try {
    const res = await axios.get('detect-info');
    return res.data.data.LOG_MEAL_TOKEN;
  } catch (error) {
    console.error('Error getDishById in:', error);
    throw error;
  }
};

export const getListIngredients = async (formData: any, keyLogMeal: string) => {
  try {
    const response = await axios.post(
      baseUrlLogMeal,
      formData,
      {
        params: {
          language: 'eng',
        },
        headers: {
          Authorization: `Bearer ${keyLogMeal}`,
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    const ingredientsAndTypes = [];

    for (const segmentationResult of response.data.segmentation_results) {
      const ingredient = segmentationResult.recognition_results[0].subclasses.map((item:any)=>item.name);
      ingredient.push(segmentationResult.recognition_results[0].name);
      const ingredientAndType = {
        ingredient: ingredient,
        type: segmentationResult.recognition_results[0].foodType.name,
      };
    
      ingredientsAndTypes.push(ingredientAndType);
    }
    
    console.debug({ingredientsAndTypes});

    const mergedIngredients = {};

    for (const { ingredient, type } of ingredientsAndTypes) {
      if (!mergedIngredients[type]) {
        mergedIngredients[type] = { ingredient: [] };
      }
    
      mergedIngredients[type].ingredient.push(...ingredient); // Combine ingredients
    
      // Remove duplicates using Set
      mergedIngredients[type].ingredient = [...new Set(mergedIngredients[type].ingredient)];
    }

    console.debug({mergedIngredients});
    
    // console.log('check ingredients: ', ingredients);
    return mergedIngredients;
  } catch (error) {
    console.error('Error getListIngredients in:', error);
    throw error;
  }
};
