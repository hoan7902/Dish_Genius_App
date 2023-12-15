import React, { memo } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import SvgUri from 'react-native-svg-uri';
import { Text } from 'native-base';
import { Colors } from '@/Theme/Variables';
import { StackNavigationProp } from '@react-navigation/stack';

interface Icon {
  active: any;
  inactive: any;
}

interface IconSet {
  [key: string]: Icon;
}

const icons: IconSet = {
  Home: {
    active: require('../../../assets/Home_Active.svg'),
    inactive: require('../../../assets/Home.svg'),
  },
  Scan: {
    active: require('../../../assets/Scan.svg'),
    inactive: require('../../../assets/Scan.svg'),
  },
  Profile: {
    active: require('../../../assets/Profile_Active.svg'),
    inactive: require('../../../assets/Profile.svg'),
  },
};

interface BottomBarItemProps {
  iconName: string;
  isActive: boolean;
  onPress: (iconName: string) => void;
}

interface BottomBarProps {
  navigation: StackNavigationProp<any, any>;
  activeIcon?: string,
}

const BottomBarItem: React.FC<BottomBarItemProps> = ({ iconName, isActive, onPress }) => (
  <TouchableOpacity style={[styles.textContainer, iconName === 'Scan' && styles.textScanContainer]} onPress={() => onPress(iconName)}>
    <SvgUri source={isActive ? icons[iconName].active : icons[iconName].inactive} />
    <Text style={isActive ? styles.textActive : styles.textNormal}>{iconName}</Text>
  </TouchableOpacity>
);

const BottomBar: React.FC<BottomBarProps> = ({ navigation, activeIcon = 'Home' }) => {
  const handleIconClick = (iconName: string) => {
    navigation.navigate(iconName);
  };

  return (
    <View style={styles.container}>
      {Object.keys(icons).map((iconName: string) => (
        <BottomBarItem
          key={iconName}
          iconName={iconName}
          isActive={activeIcon === iconName}
          onPress={handleIconClick}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 120,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 0,
    borderTopWidth: 0.5,
    borderTopColor: Colors.LIGHTER_BORDER,
    borderTopStyle: 'solid'
  },
  textContainer: {
    alignItems: 'center',
  },
  textScanContainer: {
    marginBottom: 29,
  },
  textActive: {
    color: Colors.PRIMARY,
  },
  textNormal: {
    color: Colors.TEXT_GRAY,
  },
});

export default memo(BottomBar);
