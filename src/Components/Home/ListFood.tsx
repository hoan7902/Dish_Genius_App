import { useAppSelector } from '@/Hooks/redux';
import { Colors } from '@/Theme/Variables';
import { ScrollView, Text } from 'native-base';
import React, { memo } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { TabView, SceneMap, Route, TabBar } from 'react-native-tab-view';
import FoodDetails from './FoodDetails';

const FirstRoute: React.FC = () => {
  const listFood = useAppSelector(state => state.home.listFood);
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent} style={{ marginBottom: 120 }}>
      {Object.values(listFood || {})?.map((food: any) => <FoodDetails key={food.id} item={food} />)}
    </ScrollView>
  );
};

const SecondRoute: React.FC = () => {
  const listFood = useAppSelector(state => state.home.listFood);
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent} style={{ marginBottom: 120 }}>
      {Object.values(listFood || {})?.map((food: any) => <FoodDetails key={food.id} item={food} />)}
    </ScrollView>
  );
};

const renderScene = SceneMap({
  popular: FirstRoute,
  favourite: SecondRoute,
});

const initialLayout = { width: Dimensions.get('window').width };

const ListFood: React.FC = () => {
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
        renderScene={renderScene}
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
