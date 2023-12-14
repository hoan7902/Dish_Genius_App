import React, { memo } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootScreens } from '..';
import BottomBar from '@/Components/BottomBar';

type HomeScreenProps = {
  navigation: StackNavigationProp<any, RootScreens.HOME>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate(RootScreens.PROFILE)}
      />
      <BottomBar navigation={navigation} activeIcon='Home' />
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
