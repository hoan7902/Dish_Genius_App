import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootScreens } from '..';
import SignIn from '@/Components/SignIn';

type HomeScreenProps = {
  navigation: StackNavigationProp<any, RootScreens.HOME>;
};

const SignInScreen: React.FC<HomeScreenProps> = ({ navigation }) => (
  <View style={styles.container}>
    <SignIn navigation={navigation} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default memo(SignInScreen);
