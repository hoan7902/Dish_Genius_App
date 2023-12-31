import { setIsFetchingData, setListFood } from '@/Store/reducers';
import { Colors } from '@/Theme/Variables';
import { getListFood } from '@/api';
import { HStack, Text, VStack } from 'native-base';
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

const Category: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const dispatch = useDispatch();

  const handleTypeClick = async (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
    console.log('check index: ', index);
    let query;
    if (index === 2) {
      query = "Drink";
    } else if (index === 1) {
      query = "Food";
    }
    dispatch(setIsFetchingData({ isFetchingData: true }));
    const listFood: any = await getListFood(query || '');
    dispatch(setIsFetchingData({ isFetchingData: false }));
    dispatch(setListFood({ listFood }));
  };

  return (
    <VStack style={styles.container}>
      <Text style={styles.title}>Category</Text>
      <TypeCategory handleTypeClick={handleTypeClick} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
    </VStack>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
    backgroundColor: Colors.WHITE,
    width: '100%',
    paddingHorizontal: 24,
    paddingVertical: 24
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
    backgroundColor: Colors.PRIMARY,
    minWidth: 85,
    textAlign: 'center',
  },
  textCategoryContainer: {
    borderRadius: 32,
    paddingVertical: 15,
    paddingHorizontal: 24,
    backgroundColor: Colors.FORM,
    minWidth: 85,
    textAlign: 'center',
  },
  textCategoryActive: {
    color: Colors.WHITE,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: "700"
  },
  textCategory: {
    color: Colors.TEXT_SECONDARY,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: "700"
  }
});

export default memo(Category);