import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { MainNavigator } from "./Main";
// @refresh reset

const ApplicationNavigator = () => (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );

export { ApplicationNavigator };
