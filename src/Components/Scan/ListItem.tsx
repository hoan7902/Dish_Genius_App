import { Button, HStack, ScrollView, VStack, View } from "native-base";
import React from "react";
import { memo, useState } from "react";
import { Animated, StyleSheet, Text } from "react-native";
import CateItem from "./Cate_Item";
import SvgUri from "react-native-svg-uri";
import { TouchableOpacity } from "react-native";
import Item from "./Item";



const TickIcon = () => (
  <View style={{ borderRadius: 10, justifyContent: 'center' }}>
    <SvgUri source={require('../../../assets/Tick.svg')} />
  </View>
);
const NoTickIcon = () => (
  <View style={{ borderRadius: 10, justifyContent: 'center' }}>
    <SvgUri source={require('../../../assets/NoTick.svg')} />
  </View>
);
interface ListItemProps {

}
const ListItem: React.FC<ListItemProps> = ({})=>{
  const [selected, setSelected] = useState(0);
  return (
    <ScrollView style={styles.container}>
      <VStack alignContent={"flex-start"}>
        <Text style={{
      color: '#9FA5C0',
      fontSize: 12,
      fontFamily: 'Inter',
      fontWeight: '500',
      letterSpacing: 0.50,
      flexWrap: 'wrap', // Replaced 'wordWrap' with 'flexWrap' for React Native
    }}>
          Protein:
        </Text>
        <HStack space={5} flexWrap={"nowrap"}>
          <Item/>
          <Item/>
          <Item/>
          <Item/>
        </HStack>
      </VStack>
    </ScrollView>);
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

export default memo(ListItem);