import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosInstance } from 'axios';
import {BASE_URL} from '@env';

const baseUrl = BASE_URL;

const getTokenFromStorage = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem('token');
    return token;
  } catch (error) {
    console.error('Error getting token from AsyncStorage:', error);
    return null;
  }
};

const axiosInstance: AxiosInstance = axios.create({
  baseURL: baseUrl,
  // You can add other default configurations here if needed
});

const setAuthHeader = async () => {
  try {
    const token = await getTokenFromStorage();
    if (token) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  } catch (error) {
    console.error('Error setting authorization header:', error);
  }
};

setAuthHeader(); // Call the function to set the authorization header initially

export default axiosInstance;
