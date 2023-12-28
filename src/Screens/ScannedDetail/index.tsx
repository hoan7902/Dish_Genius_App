import React, { memo, useCallback, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootScreens } from '..';
import SvgUri from 'react-native-svg-uri';
import Category from '@/Components/Scan/Category';
import ListItem from '@/Components/Scan/ListItem';
import { ScrollView, Text } from 'native-base';
import { Colors } from '@/Theme/Variables';

type ScannedDetailScreenProps = {
  navigation: StackNavigationProp<any, RootScreens.SCANNEDDETAIL>;
};


const ScannedDetailScreen: React.FC<ScannedDetailScreenProps> = ({ navigation }) => {
  const categoryData = ['Protein', 'Oil', 'Vegetables'];
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const [ingredientsList, setIngredientsList] = useState([
    { category: 'Protein', items: ['Chicken', 'Beef', 'Tofu'] },
    { category: 'Oil', items: ['Olive Oil', 'Coconut Oil', 'Vegetable Oil'] },
    { category: 'Vegetables', items: ['Broccoli', 'Carrots', 'Spinach'] },
  ]);

  const handleCategorySelect = useCallback((category: string) => {
    console.log({category});
    setSelectedCategory(category); // Cập nhật giá trị của selectedCategory khi người dùng chọn một danh mục
  }, []);

  const deleteItemFromCategory = useCallback((categoryName:string, itemName:string) => {
    const categoryIndex = ingredientsList.findIndex(cat => cat.category === categoryName);

    if (categoryIndex !== -1) {
      const items = ingredientsList[categoryIndex].items;

      const itemIndex = items.indexOf(itemName);
      if (itemIndex !== -1) {
        const updatedItems = [...items.slice(0, itemIndex), ...items.slice(itemIndex + 1)];
        setIngredientsList(prevIngredients => [
          ...prevIngredients.slice(0, categoryIndex),
          { category: categoryName, items: updatedItems },
          ...prevIngredients.slice(categoryIndex + 1),
        ]);
      } else {
        console.log('Mục không tồn tại trong danh mục này.');
      }
    } else {
      console.log('Danh mục không tồn tại.');
    }
  }, [ingredientsList]);
  return(
    <View style={styles.container}>
      <ScrollView style={styles.scroll_container}>
        <TouchableOpacity style={styles.iconBack} onPress={() => navigation.navigate(RootScreens.HOME)}>
          <SvgUri source={require('../../../assets/arrow-left.svg')} />
        </TouchableOpacity>
    
        <Category 
        categoryData={categoryData} 
        selectedCategory={selectedCategory} 
        onSelectCategory={handleCategorySelect}
        />
        <View style={styles.homeIndicator} />
        <ListItem ingredients={ingredientsList} selectedCategory={selectedCategory} deleteItemFromCategory={deleteItemFromCategory}/>
     
      </ScrollView>
      <View style={styles.scanButtonContainer}>
        <TouchableOpacity style={styles.btn} onPress={()=>{}}>
          <SvgUri source={require("../../../assets/Scan.svg")} />
          <Text style={styles.text}>Scan</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={()=>{}}>
          <SvgUri source={require("../../../assets/FindIcon.svg")} />
          <Text style={styles.text__NAVY}>Find</Text>
        </TouchableOpacity>
      </View>
   
    </View>
  );};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 40,
    position:"relative"
  },
  scroll_container:{
    width:"100%",
    height:"100%",
  },
  inner_container:{
    flex:1,
    alignItems: 'center',
    marginTop: 60
  },
  iconBack: {
    position: 'absolute',
    top: 0,
    left: 10,
    zIndex: 1,
    backgroundColor:Colors.PRIMARY,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 20,
  },
  scanButtonContainer: {
    width:"100%",
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
    display:"flex",
    alignItems:"center",
    flexDirection:"row",
    justifyContent:"space-around",
    backgroundColor:"rgba(33,19,13, 0.1)",
    height:100,
  },
  homeIndicator:{
    position: 'absolute',
    top: 10,
    left: '50%',
    transform: [{ translateX: -20 }],
    backgroundColor: Colors.GRAY_INDICATOR,
    borderRadius: 100,
    height: 5,
    width: 40,
    marginBottom: 10
  },
  btn:{
    display:"flex",
    color: Colors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  text:{
    fontSize:10,
    fontWeight:"bold",
    color:Colors.PRIMARY
  },
  text__NAVY:{
    fontSize:10,
    fontWeight:"bold",
    color:Colors.NAVY

  }
});

export default memo(ScannedDetailScreen);
