import React from "react";
import { StatusBar, Image, StyleSheet, ViewStyle } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { MainNavigator } from "./Main";
import { WelcomeContainer } from "@/Screens/Welcome";
import { RootScreens } from "@/Screens";
import { OnboardFlow } from "react-native-onboard";

export type RootStackParamList = {
  [RootScreens.MAIN]: undefined;
  [RootScreens.WELCOME]: undefined;
};

const buttonStyled: ViewStyle = {
  backgroundColor: '#1FCC79',
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

// @refresh reset
const ApplicationNavigator = () => {
  return (
    <NavigationContainer>
      <OnboardFlow
        pages={[
          {
            title: 'Welcome to Dish Genius!',
            subtitle: 'Explore diverse dishes with ingredients you already have.',
            imageUri: Image.resolveAssetSource(require('../../assets/Onboarding01.png')).uri,
          },
          {
            title: 'Discover New Tastes',
            subtitle: 'Share your ingredients, and I\'ll suggest dishes.',
            imageUri: Image.resolveAssetSource(require('../../assets/Onboarding02.png')).uri,
          },
          {
            title: 'Enjoy Home Cooking',
            subtitle: 'Get cooking instructions and manage your favorite recipes.',
            imageUri: Image.resolveAssetSource(require('../../assets/Onboarding03.png')).uri,
          }
        ]}
        type={'fullscreen'}
        primaryButtonStyle={buttonStyled}
        paginationColor='#bbb'
        paginationSelectedColor='#1FCC79'
    />
    </NavigationContainer>
  );
};

export { ApplicationNavigator };
