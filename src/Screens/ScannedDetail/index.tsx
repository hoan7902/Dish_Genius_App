import React, { memo, useCallback, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootScreens } from '..';
import SvgUri from 'react-native-svg-uri';
import Category from '@/Components/Scan/Category';
import ListItem from '@/Components/Scan/ListItem';
import { ScrollView, Text } from 'native-base';
import { Colors } from '@/Theme/Variables';
import { useAppSelector } from '@/Hooks/redux';
import { useDispatch } from 'react-redux';
import { deleteScanIngredient } from '@/Store/reducers';

type ScannedDetailScreenProps = {
  navigation: StackNavigationProp<any, RootScreens.SCANNEDDETAIL>;
};


const ScannedDetailScreen: React.FC<ScannedDetailScreenProps> = ({ navigation }) => {
  const listScanIngredients = useAppSelector(state=>state.scan.ingredientsAndTypes) || ['Protein', 'Oil', 'Vegetables'];
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const dispatch = useDispatch();
  // const categoryData = ['Protein', 'Oil', 'Vegetables'];
  const categoryData = Object.keys(listScanIngredients);

  // Transform ingredient data:
  const transformedList = categoryData.map(category => ({
    category,
    items: [...new Set(listScanIngredients[category].ingredient.filter(item => item))] // Remove duplicates and empty strings
  }));
  const [ingredientsList, setIngredientsList] = useState(transformedList);
  // const listScanIngredients = useAppSelector(state=>state.scan.listScanIngredients);

  // const [ingredientsList, setIngredientsList] = useState([
  //   { category: 'Protein', items: ['Chicken', 'Beef', 'Tofu'] },
  //   { category: 'Oil', items: ['Olive Oil', 'Coconut Oil', 'Vegetable Oil'] },
  //   { category: 'Vegetables', items: listScanIngredients },
  // ]);

  const handleCategorySelect = useCallback((category: string) => {
    console.log({category});
    setSelectedCategory(category); // Cập nhật giá trị của selectedCategory khi người dùng chọn một danh mục
  }, []);

  const deleteItemFromCategory = useCallback((categoryName:string, itemName:string) => {
    dispatch(deleteScanIngredient({item:itemName}));
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
    <SafeAreaView style={styles.container}>
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
        <TouchableOpacity style={styles.btn} onPress={()=>{navigation.navigate(RootScreens.SCAN);}}>
          <SvgUri source={require("../../../assets/Scan.svg")} />
          <Text style={styles.text}>Scan</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={()=>{navigation.navigate(RootScreens.SCAN_RESULT);}}>
          <SvgUri source={require("../../../assets/FindIcon.svg")} />
          <Text style={styles.text__NAVY}>Find</Text>
        </TouchableOpacity>
      </View>
   
    </SafeAreaView>
  );};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    position:"relative",
    marginTop:10,
  },
  scroll_container:{
    width:"100%",
    height:"100%",
  },
  inner_container:{
    marginTop: 70,
    flex:1,
    alignItems: 'center',
  },
  iconBack: {
    position: 'relative',
    width:50,
    marginTop:10,
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
