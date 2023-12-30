import { useAppSelector } from '@/Hooks/redux';
import { Colors } from '@/Theme/Variables';
import { ScrollView, Spinner, Text } from 'native-base';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { TabView, Route, TabBar } from 'react-native-tab-view';
import FoodDetails from './FoodDetails';
import BaseButton from '../BaseButton';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootScreens } from '@/Screens';
import { getDishById } from '@/api';

interface ListFoodProps {
  navigation?: StackNavigationProp<any, any>;
}

interface FirstRouteProps {
  navigation?: StackNavigationProp<any, any>;
}



const FirstRoute: React.FC<FirstRouteProps> = ({ navigation }) => {
  const listFood = useAppSelector(state => state.scan.listScanFood);
  const isFetchingData = useAppSelector(state => state.scan.isFetchingScanData);
  if (Object.values(listFood || {}).length === 0 || !listFood || isFetchingData) {
    return <View style={{ marginTop: 100 }}>
      <Spinner color="emerald.500" size="lg"/>
    </View>;
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent} style={{ marginBottom: 120 }}>
      {Object.values(listFood || {})?.map((food: any) => <FoodDetails key={food?.id} item={food} onPress={() => navigation?.navigate(RootScreens.FOOD_DETAILS, { food })}/>)}
    </ScrollView>
  );
};

const ListFood: React.FC<ListFoodProps> = ({ navigation }) => (
  <View style={styles.container}>
    <FirstRoute navigation={navigation}/>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    marginTop: 12
  },
  textRoute: {
    fontSize: 15,
    fontWeight: '600',
  },
  scrollViewContent: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 24,
    overflow: 'scroll',
    zIndex: 1,
    alignItems: 'center', // Horizontally center content
    justifyContent: 'center', // Vertically center content
  }
});

export default memo(ListFood);
