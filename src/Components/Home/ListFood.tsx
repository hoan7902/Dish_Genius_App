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

interface SecondRouteProps {
  navigation?: StackNavigationProp<any, any>;
}

const FirstRoute: React.FC<FirstRouteProps> = ({ navigation }) => {
  const listFood = useAppSelector(state => state.home.listFood);
  const isFetchingData = useAppSelector(state => state.home.isFetchingData);
  if (Object.values(listFood || {}).length === 0 || !listFood || isFetchingData) {
    return <View style={{ marginTop: 100 }}>
      <Spinner color="emerald.500" size="lg"/>
    </View>;
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent} style={{ marginBottom: 120 }}>
      {Object.values(listFood || {})?.map((food: any) => <FoodDetails key={food.id} item={food} onPress={() => navigation?.navigate(RootScreens.FOOD_DETAILS, { food })}/>)}
    </ScrollView>
  );
};

const SecondRoute: React.FC<SecondRouteProps> = ({ navigation }) => {
  const userId = useAppSelector(state => state.user.userId);
  const listFavouriteIds = useAppSelector(state => state.home.listFavouriteIds);
  const [listFoodFavourite, setListFoodFavourite] = useState([]);
  const isFetchingData = useAppSelector(state => state.home.isFetchingData);

  const fetchFavouriteFood = useCallback(async () => {
    try {
      for (const id of listFavouriteIds) {
        const res = await getDishById(id);
        setListFoodFavourite(prevList => {
          if (!prevList.some(item => item.id === res.id)) {
            return [...prevList, res];
          }
          return prevList; // Nếu id đã tồn tại, không thêm vào mảng
        });
      }
    } catch (error) {
      console.error('Error fetching favourite food:', error);
    }
  }, [listFavouriteIds]);

  useEffect(() => {
    fetchFavouriteFood();
  }, [userId, listFavouriteIds]);

  if (!userId) {
    return <View style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <BaseButton
        buttonText="Sign in"
        buttonColor={Colors.PRIMARY}
        buttonTextColor="white"
        onPress={() => navigation?.navigate(RootScreens.SIGNIN)}
        width={250}
      />
    </View>;
  }

  if (isFetchingData) {
    return <View style={{ marginTop: 100 }}>
      <Spinner color="emerald.500" size="lg"/>
    </View>;
  }

  if (Object.values(listFoodFavourite || {}).length === 0 || !listFoodFavourite || isFetchingData) {
    return <View style={{ marginTop: 100, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Text>You don't have any favorite dishes yet.</Text>
    </View>;
  }
  
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent} style={{ marginBottom: 120 }}>
      {listFoodFavourite?.map((food: any) => 
        <FoodDetails 
          key={food.id} 
          item={food} 
          onPress={() => navigation?.navigate(RootScreens.FOOD_DETAILS, { food })} 
        />)}
    </ScrollView>
  );
};

const renderScene = ({ route, navigation }: { route: Route; navigation: StackNavigationProp<any, any>; }) => {
  switch (route.key) {
    case 'popular':
      return <FirstRoute navigation={navigation} />;
    case 'favourite':
      return <SecondRoute navigation={navigation} />;
    default:
      return null;
  }
};

const initialLayout = { width: Dimensions.get('window').width };

const ListFood: React.FC<ListFoodProps> = ({ navigation }) => {
  const [index, setIndex] = React.useState<number>(0);
  const [routes] = React.useState<Route[]>([
    { key: 'popular', title: 'Popular' },
    { key: 'favourite', title: 'Favourite' },
  ]);

  const handleIndexChange = (index: number) => {
    setIndex(index);
  };

  const renderLabel = (text: string) => (<Text style={styles.textRoute}>
    {text}
  </Text>);

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: Colors.PRIMARY }}
      style={{ backgroundColor: Colors.WHITE }}
      activeColor={Colors.NAVY}
      inactiveColor={Colors.TEXT_SECONDARY}
      renderLabel={({ route, color }) => (
        <Text style={{ color, margin: 8 }}>
          {renderLabel(route.title || '')}
        </Text>
      )}
    />
  );

  return (
    <View style={styles.container}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={(props) => renderScene({ ...props, navigation })} // Pass navigation prop here
        onIndexChange={handleIndexChange}
        initialLayout={initialLayout}
        renderTabBar={renderTabBar}
      />
    </View>
  );
};

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
