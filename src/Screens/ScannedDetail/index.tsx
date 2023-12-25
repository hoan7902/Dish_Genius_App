import React, { memo, useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootScreens } from '..';
import SvgUri from 'react-native-svg-uri';
import Category from '@/Components/Scan/Category';
import ListItem from '@/Components/Scan/ListItem';
import { ScrollView } from 'native-base';

type ScannedDetailScreenProps = {
  navigation: StackNavigationProp<any, RootScreens.SCANNEDDETAIL>;
};


const ScannedDetailScreen: React.FC<ScannedDetailScreenProps> = ({ navigation }) => (
  <View  style={styles.container}>
    <ScrollView >
      <TouchableOpacity style={styles.iconBack} onPress={() => navigation.navigate(RootScreens.HOME)}>
        <SvgUri source={require('../../../assets/arrow-left.svg')} />
      </TouchableOpacity>
    
      <Category/>

      <ListItem/>
     
    </ScrollView>
    <View style={styles.scanButtonContainer}>
      <TouchableOpacity onPress={()=>{}}>
        <SvgUri source={require("../../../assets/Scan.svg")} />
      </TouchableOpacity>
    </View>
   
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 40,
    position:"relative"
  },
  inner_container:{
    flex:1,
    alignItems: 'center',
    marginTop: 60
  },
  iconBack: {
    position: 'absolute',
    top: 0,
    left: 20,
    zIndex: 1,
  },
  scanButtonContainer: {
    position: 'absolute',
    bottom: 40,
    zIndex: 1,
  },
});

export default memo(ScannedDetailScreen);
