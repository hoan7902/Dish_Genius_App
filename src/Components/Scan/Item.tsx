import React, { useRef } from 'react';
import { View, Text, PanResponder, Animated } from 'react-native';
import SvgUri from 'react-native-svg-uri';

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
const Item = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const tickAnimatedValue = useRef(new Animated.Value(100)).current;

  const tickPanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      Animated.timing(tickAnimatedValue, {
        toValue: 1,
        duration: 100, // Adjust duration as needed
        useNativeDriver: false,
      }).start();
    },
    onPanResponderRelease: () => {
      Animated.timing(tickAnimatedValue, {
        toValue: 0,
        duration: 500, // Adjust duration as needed
        useNativeDriver: false,
      }).start();
    },
  });

  const tickWidth = tickAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["85%", "0%"],
  });

  const tickBackgroundColor = tickAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(0, 0, 0, 0)', 'rgba(168.62, 231.63, 138.98, 0.80)'], // Transparent to red
  });

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 100, // Adjust duration as needed
        useNativeDriver: false,
      }).start();
    },
    onPanResponderRelease: () => {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 500, // Adjust duration as needed
        useNativeDriver: false,
      }).start();
    },
  });

  const width = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "85%"],
  });
  const borderColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["#3EC032", "#E24F2F"],
  });

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(0, 0, 0, 0)', '#F0CCC1'], // Transparent to red
  });

  const lineWidth = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200],
  });
  
  const lineBackgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(0, 0, 0, 0)', '#FF6464'], // Transparent to red
  });

  return (
    <Animated.View
      style={{
        width: '100%',
        maxWidth: 120,
        height: '100%',
        paddingLeft: 7,
        paddingRight: 7,
        paddingTop: 4,
        paddingBottom: 4,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: borderColor,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 21,
        backgroundColor: "transparent",
        position:"relative",
        zIndex:100,
        overflow:"hidden"

      }}
    >
      <Animated.View  {...tickPanResponder.panHandlers} style={{ width: 8, height: "100%", zIndex:100, flex:1, justifyContent:"center", alignItems:"center" }}>
        <TickIcon />
      </Animated.View>
      <Text
        style={{
          color: '#2E3E5C',
          fontSize: 15,
          fontWeight: '500',
          lineHeight: 25,
          letterSpacing: 0.5,
          flexWrap: 'wrap',
          zIndex:100
        }}
      >
        Egg
      </Text>
      <Animated.View {...panResponder.panHandlers} style={{flex:1, justifyContent:"center", alignItems:"center" , width: 6, height: 6, zIndex:100 }}>
        <NoTickIcon />    
      </Animated.View>
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          bottom:0,
          right: 0,
          width: width,
          // height: '100%',
          backgroundColor: backgroundColor,
          paddingLeft: 7,
          paddingRight: 7,
          paddingTop: 4, // Adjust padding top value
          paddingBottom: 4, // Adjust padding bottom value
          borderRadius: 10,
          borderTopLeftRadius: 20,
          borderBottomLeftRadius: 20,
          zIndex: 2, // Ensure it's above the overlay
        }}
      />

      <Animated.View
        style={{
          position: 'absolute',
          top: "65%",
          right: -10,
          width: lineWidth,
          height: 1,
          backgroundColor: lineBackgroundColor,
           // Adjust padding bottom value
          borderRadius: 25,
          zIndex: 2, // Ensure it's above the overlay
        }}
      />

      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          bottom:0,
          left: 0,
          width: tickWidth,
          // height: '100%',
          backgroundColor: tickBackgroundColor,
          paddingLeft: 7,
          paddingRight: 7,
          paddingTop: 4, // Adjust padding top value
          paddingBottom: 4, // Adjust padding bottom value
          borderRadius: 10,
          borderTopRightRadius: 20,
          borderBottomRightRadius: 20,
          zIndex: 2, // Ensure it's above the overlay
        }}
      />
    </Animated.View>
  );
};

export default Item;
