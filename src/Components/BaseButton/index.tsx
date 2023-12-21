import React, { memo } from 'react';
import { TouchableOpacity, View, Text, GestureResponderEvent } from 'react-native';
import SvgUri from 'react-native-svg-uri';

interface CustomButtonProps {
  flag?: boolean;
  iconSource?: any;
  buttonText: string;
  buttonColor: string;
  buttonTextColor: string;
  onPress?: (event: GestureResponderEvent) => void;
  width?: number;
  marginTop?: number;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  flag,
  iconSource,
  buttonText,
  buttonColor,
  buttonTextColor,
  onPress,
  width,
  marginTop,
}) => (
  <TouchableOpacity
    style={{
      width: width !== undefined ? width : 327,
      height: 62,
      backgroundColor: buttonColor,
      borderRadius: 32,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: marginTop !== undefined ? marginTop : 27,
    }}
    onPress={onPress}
  >
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
      {flag && (
        <View style={{ width: 24, height: 24, marginRight: 8 }}>
          <SvgUri source={iconSource} />
        </View>
        )}
      <Text style={{ color: buttonTextColor, fontSize: 15, fontWeight: '700' }}>
        {buttonText}
      </Text>
    </View>
  </TouchableOpacity>
);

export default memo(CustomButton);
