import React from "react";
import { memo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { HStack, VStack } from "native-base";
import Item from "./Item";
import { Colors } from "@/Theme/Variables";

interface ListItemProps {
  ingredients: {
    category: string;
    items: string[];
  }[];
  selectedCategory:string;
  deleteItemFromCategory: (categoryName: string,  itemName: string) => void;
}

const ListItem: React.FC<ListItemProps> = ({ ingredients, selectedCategory, deleteItemFromCategory }) => (
  <View style={styles.container}>
    {ingredients.map((ingredientGroup, index) => (
      <VStack key={index} display={(selectedCategory==="All" || selectedCategory===ingredientGroup.category)? "flex":"none"} alignContent={"flex-start"} space={2}>
        <Text style={styles.text}>
          {ingredientGroup.category}:
        </Text>
        <HStack space={2} flexWrap={"wrap"} justifyContent="space-between" width={"100%"}>
          {ingredientGroup.items.map((item, itemIndex) => (
            <Item key={itemIndex} name={item}  deleteItemFromCategory={() => deleteItemFromCategory(ingredientGroup.category, item)}/>
            ))}
        </HStack>
      </VStack>
      ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    marginTop: 40,
    padding: 10,
    marginBottom: 90,
    borderTopWidth: 1,
    borderTopColor: Colors.GRAY_INDICATOR,
    borderTopStyle: 'solid',
  },
  text: {
    color: '#9FA5C0',
    fontSize: 12,
    fontFamily: 'Inter',
    fontWeight: '500',
    letterSpacing: 0.50,
    flexWrap: 'nowrap', // Replaced 'wordWrap' with 'flexWrap' for React Native
  }
});

export default memo(ListItem);
