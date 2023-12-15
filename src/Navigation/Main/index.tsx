// MainNavigator.tsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootScreens } from "@/Screens";
import Home from "@/Screens/Home";
import Welcome from "@/Screens/Welcome";
import Profile from "@/Screens/Profile";
import { VStack } from "native-base";

const Stack = createNativeStackNavigator();

type MainNavigatorProps = {};

export const MainNavigator: React.FC<MainNavigatorProps> = () => (
    <VStack style={{ flex: 1 }}>
      <Stack.Navigator
        initialRouteName={RootScreens.WELCOME}
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
          name={RootScreens.SCAN}
          component={Home}
        />
      </Stack.Navigator>
    </VStack>
  );
