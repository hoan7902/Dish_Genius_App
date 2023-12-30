import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootScreens } from '..';
import BottomBar from '@/Components/BottomBar';
import { Input, StatusBar, VStack } from 'native-base';
import SvgUri from 'react-native-svg-uri';
import Category from '@/Components/Home/Category';
import ListFood from '@/Components/Scan/ListFood';
import { getListFood } from '@/api';
import { addListScanFood, setIsFetchingData, setIsFetchingScanData, setListFood, setListScanFood } from '@/Store/reducers';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/Hooks/redux';
import FilterScanList from '@/Components/Scan/FilterScanList';
import { Colors } from '@/Theme/Variables';

type ScanResultScreenProps = {
  navigation: StackNavigationProp<any, RootScreens.HOME>;
};

const SearchIcon = () => <View style={{ marginLeft: 15, height: 56, display: 'flex', justifyContent: 'center' }}>
  <SvgUri source={require('../../../assets/search.svg')} />
</View>;

const ScanResultScreen: React.FC<ScanResultScreenProps> = ({ navigation }) => {

  const query = useAppSelector(state=>state.scan.query);  
  const listScanIngredients = useAppSelector(state=>state.scan.listScanIngredients);  
  const dispatch = useDispatch();
  console.log(query);

  const fetchListData = useCallback(async () => {
    dispatch(setIsFetchingScanData({ isFetchingData: true }));
    console.log(listScanIngredients);
  
    try {
      let listFood = await Promise.all(
        listScanIngredients?.map(async (item: any) => {const result = await getListFood(item); return result;})
      );
  
      // Flatting the listFood array
      listFood = listFood.flat(1);
  
      console.log(listFood.length);
      console.log({listFood});
      
      dispatch(setListScanFood({ listFood }));
    } catch (error) {
      // Xử lý bất kỳ lỗi nào có thể xảy ra trong quá trình fetching
      console.error('Error fetching list data:', error);
    } finally {
      dispatch(setIsFetchingScanData({ isFetchingData: false }));
    }
  }, [query]);

  useEffect(()=>{
    fetchListData();
  },[]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.PRIMARY}/>
      <FilterScanList />
      <ListFood navigation={navigation} />
      <BottomBar navigation={navigation} activeIcon='Scan' />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width:"100%",
    flex: 1,
    alignItems: 'center',
    // marginTop: 60
  },
});

export default memo(ScanResultScreen);
