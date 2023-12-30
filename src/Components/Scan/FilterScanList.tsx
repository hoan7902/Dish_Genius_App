import { useAppSelector } from '@/Hooks/redux';
import { addListScanFood, setIsFetchingData, setIsFetchingScanData, setListFood, setListScanFood } from '@/Store/reducers';
import { Colors } from '@/Theme/Variables';
import { getListFood } from '@/api';
import { HStack, Text, VStack, View } from 'native-base';
import React, { memo, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';

const types = ["All", "Food", "Drink"];

interface TypeCategoryProps {
  activeIndex: number | null;
  handleTypeClick: (index: number) => void;
}

const TypeCategory: React.FC<TypeCategoryProps> = ({ activeIndex, handleTypeClick }) => (
  <HStack style={styles.typeCategoryContainer}>
    {types.map((type, index) => (
      <TouchableOpacity
          key={index}
          style={[
            styles.textCategoryContainer,
            index === activeIndex ? styles.textCategoryContainerActive : null,
          ]}
          onPress={() => handleTypeClick(index)}
        >
        <Text
            style={[
              styles.textCategory,
              index === activeIndex ? styles.textCategoryActive : null,
            ]}
          >
          {type}
        </Text>
      </TouchableOpacity>
        ))}
  </HStack>
);

const FilterScanList: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const listScanIngredients = useAppSelector(state=>state.scan.listScanIngredients);
  const dispatch = useDispatch();

  const handleTypeClick = async (index: number) => {
    setActiveIndex(index === activeIndex ? activeIndex : index);
    console.log('check index: ', index);
    let query: string;
    if (index === 2) {
      query = " Drink";
    } else if (index === 1) {
      query = " Food";
    }

    dispatch(setIsFetchingScanData({ isFetchingData: true }));
    console.log(listScanIngredients);
  
    try {
      let listFood = await Promise.all(
        listScanIngredients.map(async (item: any) => {const result = await getListFood(`${item}${query}`); return result;})
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
  };

  return (
    <VStack style={styles.container}>
      <TypeCategory handleTypeClick={handleTypeClick} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
      <View style={styles.homeIndicator} />
    </VStack>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop:50,
    gap: 10,
    backgroundColor: Colors.PRIMARY,
    width: '100%',
    paddingHorizontal: 24,
    paddingVertical: 24,
    borderBottomLeftRadius:20,
    borderBottomRightRadius:20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // For Android
  },
  title: {
    color: Colors.NAVY,
    fontSize: 17,
    fontWeight: '700',
    lineHeight: 27
  },
  typeCategoryContainer: {
    width: '100%',
    gap: 16,
  },
  textCategoryContainerActive: {
    borderRadius: 32,
    paddingVertical: 15,
    paddingHorizontal: 24,
    backgroundColor: Colors.WHITE,
    minWidth: 85,
    textAlign: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // For Android
  },
  textCategoryContainer: {
    borderRadius: 32,
    paddingVertical: 15,
    paddingHorizontal: 24,
    backgroundColor: Colors.GRAY_INDICATOR,
    minWidth: 85,
    textAlign: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // For Android
  },
  textCategoryActive: {
    color: Colors.PRIMARY,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: "700"
  },
  textCategory: {
    color: Colors.TEXT_SECONDARY,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: "700"
  },
  homeIndicator:{
    position: 'absolute',
    bottom: 10,
    left: '55%',
    transform: [{ translateX: -20 }],
    backgroundColor: Colors.GRAY_INDICATOR,
    borderRadius: 100,
    height: 5,
    width: 40,
    marginBottom: 10
  },
});

export default memo(FilterScanList);