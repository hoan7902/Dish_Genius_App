import { Button, HStack, ScrollView, VStack, View } from "native-base";
import React from "react";
import { memo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native"; // Import TouchableOpacity
import CateItem from "./Cate_Item";

type CategoryProps = {
  categoryData: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string) => void;
};

const Category: React.FC<CategoryProps> = ({ categoryData, selectedCategory, onSelectCategory }) => {
  const [selected, setSelected] = useState<number | null>(-1); // Track the selected category index

  const colors = ["#F0CCC1", "#A9E88B33", "#C1DAF0", "#F2B822"];

  const handleCategorySelection = (index: number, category: string) => {
    setSelected(index); // Set the selected category index
    onSelectCategory(category); // Call the onSelectCategory callback with the selected category
  };

  return (
    <VStack alignContent={"flex-start"} style={styles.container}>
      <Text style={styles.headerText}>Scanned Ingredient</Text>
      <HStack justifyContent={"space-between"} paddingY={2}>
        <Text style={styles.text}>Scanned Ingredient</Text>
        <Button variant={"ghost"} onPress={() => {onSelectCategory("All"), setSelected(-1);}}>
          Show all
        </Button>
      </HStack>
      <ScrollView horizontal={true}>
        <HStack space={2}>
          {categoryData.map((category, index) => (
            <TouchableOpacity
            style={{width:100, height:120, position:"relative", top:1, left:10}}
              key={index}
              onPress={() => handleCategorySelection(index, category)} // Call handleCategorySelection when a category is pressed
            >
              <CateItem
                text={category}
                color={colors[index % colors.length]}
                isSelected={selected === index||selected === -1} // Pass isSelected prop to CateItem
              />
            </TouchableOpacity>
          ))}
        </HStack>
      </ScrollView>
    </VStack>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:"100%",
    marginTop:50,
    padding: 10,
  },
  iconBack: {
    position: 'absolute',
    top: 0,
    left: 20,
    zIndex: 1,
  },
  headerText:{
    color: '#3E5481',
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 32,
    letterSpacing: 0.50,
    wordWrap: 'break-word'
  },
  text:{
    color: '#9FA5C0',
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.50,
    wordWrap: 'break-word'
  }
});

export default memo(Category);
