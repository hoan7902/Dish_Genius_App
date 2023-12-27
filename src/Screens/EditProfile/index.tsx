import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootScreens } from '..';
import BottomBar from '@/Components/BottomBar';
import EditProfile from '@/Components/EditProfile';

type HomeScreenProps = {
  navigation: StackNavigationProp<any, RootScreens.HOME>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => (
  <View style={styles.container}>
    <EditProfile navigation={navigation} />
    <BottomBar navigation={navigation} activeIcon='Profile' />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default memo(HomeScreen);
