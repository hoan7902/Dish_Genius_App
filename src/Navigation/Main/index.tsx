// MainNavigator.tsx
import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootScreens } from "@/Screens";
import Home from "@/Screens/Home";
import Scan from "@/Screens/Scan";
import Scanned from "@/Screens/ScannedDetail";
import Welcome from "@/Screens/Welcome";
import Profile from "@/Screens/Profile";
import { VStack } from "native-base";
import { getFavouriteDishIds, getListFood } from "@/api";
import { useDispatch } from "react-redux";
import { setIsFetchingData, setListFavouriteIds, setListFood, setUserId } from "@/Store/reducers";
import SignIn from "@/Screens/SignIn";
import SignUp from "@/Screens/SignUp";
import EditProfile from "@/Screens/EditProfile";
import FoodMoreDetails from "@/Screens/FoodMoreDetails";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppSelector } from "@/Hooks/redux";
import EditPassword from "@/Components/EditPassword";

const Stack = createNativeStackNavigator();

export const MainNavigator: React.FC = () => {
  const dispatch = useDispatch();
  const userId = useAppSelector(state => state.user.userId);
  const fetchInitialData = async () => {
    const userId = await AsyncStorage.getItem('userId');
    dispatch(setUserId({ userId }));
    dispatch(setIsFetchingData({ isFetchingData: true }));
    const listFood: any = await getListFood();
    dispatch(setIsFetchingData({ isFetchingData: false }));
    dispatch(setListFood({ listFood }));
    const resFavouriteIds = await getFavouriteDishIds();
    dispatch(setListFavouriteIds({ listFavouriteIds: resFavouriteIds.data.ids}));
  };
  useEffect(() => {
    fetchInitialData();
  }, [userId]);

  return (
    <VStack style={{ flex: 1 }}>
      <Stack.Navigator
        initialRouteName={RootScreens.HOME}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name={RootScreens.HOME}
          component={Home}
        />
        <Stack.Screen
          name={RootScreens.WELCOME}
          component={Welcome}
        />
        <Stack.Screen
          name={RootScreens.PROFILE}
          component={Profile}
        />
        <Stack.Screen
          name={RootScreens.EDIT_PROFILE}
          component={EditProfile}
        />
        <Stack.Screen
          name={RootScreens.EDIT_PASSWORD}
          component={EditPassword}
        />
        <Stack.Screen
          name={RootScreens.SCAN}
          component={Scan}
        />
        <Stack.Screen
          name={RootScreens.SCANNEDDETAIL}
          component={Scanned}
        />
        <Stack.Screen 
          name={RootScreens.SIGNIN}
          component={SignIn}
        />
        <Stack.Screen 
          name={RootScreens.SIGNUP}
          component={SignUp}
        />
        <Stack.Screen 
          name={RootScreens.FOOD_DETAILS}
          component={FoodMoreDetails}
        />
      </Stack.Navigator>
    </VStack>
  );
};
