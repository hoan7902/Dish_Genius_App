// MainNavigator.tsx
import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootScreens } from "@/Screens";
import Home from "@/Screens/Home";
import Welcome from "@/Screens/Welcome";
import Profile from "@/Screens/Profile";
import { VStack } from "native-base";
import { getListFood } from "@/api";
import { useDispatch } from "react-redux";
import { setListFood } from "@/Store/reducers";
import SignIn from "@/Screens/SignIn";
import SignUp from "@/Screens/SignUp";
import EditProfile from "@/Screens/EditProfile";

const Stack = createNativeStackNavigator();

export const MainNavigator: React.FC = () => {
  const dispatch = useDispatch();
  const fetchDishes = async () => {
    const listFood: any = await getListFood();
    dispatch(setListFood({ ...listFood }));
  };
  useEffect(() => {
    fetchDishes();
  }, []);
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
          name={RootScreens.SCAN}
          component={Home}
        />
        <Stack.Screen 
          name={RootScreens.SIGNIN}
          component={SignIn}
        />
        <Stack.Screen 
          name={RootScreens.SIGNUP}
          component={SignUp}
        />
      </Stack.Navigator>
    </VStack>
  );
};
