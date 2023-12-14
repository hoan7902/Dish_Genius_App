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
      <Text>Profile Screen</Text>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate(RootScreens.HOME)}
      />
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