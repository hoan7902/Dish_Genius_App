import React, { memo, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootScreens } from '..';
import BottomBar from '@/Components/BottomBar';
import { Input, VStack } from 'native-base';
import SvgUri from 'react-native-svg-uri';
import Category from '@/Components/Home/Category';
import ListFood from '@/Components/Home/ListFood';

type HomeScreenProps = {
  navigation: StackNavigationProp<any, RootScreens.HOME>;
};

const SearchIcon = () => <View style={{ marginLeft: 15, height: 56, display: 'flex', justifyContent: 'center' }}>
  <SvgUri source={require('../../../assets/search.svg')} />
</View>;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  return (
    <View style={styles.container}>
      <VStack style={{ width: '100%', paddingHorizontal: 24, backgroundColor: '#fff' }}>
        <Input
          size="2xl"
          leftElement={<SearchIcon />}
          variant="rounded"
          placeholder="Search"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)} // Update searchQuery state on input change
        />
      </VStack>
      <Category />
      <ListFood />
      <BottomBar navigation={navigation} activeIcon='Home' />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 60
  },
});

export default memo(HomeScreen);
