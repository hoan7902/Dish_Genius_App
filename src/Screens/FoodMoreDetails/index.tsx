import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import BottomBar from '@/Components/BottomBar';
import FoodMoreDetails from '@/Components/Home/FoodMoreDetails';
import useProcessedFood from '@/Hooks/useProcessedFood';

type FoodMoreDetailsScreenProps = {
  navigation: StackNavigationProp<any, any>;
  route: any;
};

const FoodMoreDetailsScreen: React.FC<FoodMoreDetailsScreenProps> = ({ navigation, route }) => {
  const processedFood = useProcessedFood(route.params.food);
  return (
    <View style={styles.container}>
      <FoodMoreDetails food={processedFood} navigation={navigation} />
      <BottomBar navigation={navigation} activeIcon='Home' />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default memo(FoodMoreDetailsScreen);
