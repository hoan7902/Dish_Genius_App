import { Button, HStack, ScrollView, VStack, View } from "native-base";
import React from "react";
import { memo, useState } from "react";
import { StyleSheet, Text } from "react-native";
import CateItem from "./Cate_Item";

interface TypeCategoryProps {

}
const Category: React.FC<TypeCategoryProps> = ({})=>{
  const [selected, setSelected] = useState(0);
  return (
    <VStack alignContent={"flex-start"} style={styles.container}>
      <Text style={styles.headerText}>Scanned Ingredient</Text>
      <HStack justifyContent={"space-between"} paddingY={10}>
        <Text style={styles.text}>Scanned Ingredient</Text>
        <Button variant={"ghost"}>Show all</Button>
      </HStack>
      <ScrollView horizontal={true}>
        <HStack space={2}>
          <CateItem text={"Starches"} color={"#F0CCC1"} />
          <CateItem text={"Proteins"} color={"#A9E88B33"} />
          <CateItem text={"Oils"} color={"#C1DAF0"} />
          <CateItem text={"Starches"} color={"#F2B822"} />
        </HStack>
      </ScrollView>
    </VStack>);
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:"100%",
    marginTop:40,
    padding: 10
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
    fontFamily: 'Inter',
    fontWeight: '700',
    lineHeight: 32,
    letterSpacing: 0.50,
    wordWrap: 'break-word'
  },
  text:{
    color: '#9FA5C0',
    fontSize: 12,
    fontFamily: 'Inter',
    fontWeight: '500',
    letterSpacing: 0.50,
    wordWrap: 'break-word'
  }
});

export default memo(Category);