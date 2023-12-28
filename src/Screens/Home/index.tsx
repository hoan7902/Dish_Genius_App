import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootScreens } from '..';
import BottomBar from '@/Components/BottomBar';
import { Input, VStack } from 'native-base';
import SvgUri from 'react-native-svg-uri';
import Category from '@/Components/Home/Category';
import ListFood from '@/Components/Home/ListFood';
import { getListFood } from '@/api';
import { setIsFetchingData, setListFood } from '@/Store/reducers';
import { useDispatch } from 'react-redux';

type HomeScreenProps = {
  navigation: StackNavigationProp<any, RootScreens.HOME>;
};

const SearchIcon = () => <View style={{ marginLeft: 15, height: 56, display: 'flex', justifyContent: 'center' }}>
  <SvgUri source={require('../../../assets/search.svg')} />
</View>;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dispatch = useDispatch();

  const handleOnSearch = useCallback((text) => {
    setSearchQuery(text); // Cập nhật searchQuery

    // Xóa timeout trước đó (nếu có)
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Tạo mới timeout với thời gian chờ là 1000ms (1s)
    timeoutRef.current = setTimeout(async () => {
      dispatch(setIsFetchingData({ isFetchingData: true }));
      const listFood = await getListFood(text);
      dispatch(setListFood({ listFood }));
      dispatch(setIsFetchingData({ isFetchingData: false }));
    }, 800);
  }, []);

  return (
    <View style={styles.container}>
      <VStack style={{ width: '100%', paddingHorizontal: 24, backgroundColor: '#fff' }}>
        <Input
          size="2xl"
          leftElement={<SearchIcon />}
          variant="rounded"
          placeholder="Search"
          value={searchQuery}
          onChangeText={(text) => handleOnSearch(text)} // Update searchQuery state on input change
        />
      </VStack>
      <Category />
      <ListFood navigation={navigation} />
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
