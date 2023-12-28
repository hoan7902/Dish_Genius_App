import React from 'react';
import { View, Text, TouchableOpacity, ColorValue } from 'react-native';

interface YourComponentProps {
  text: string;
  color: ColorValue;
  isSelected: boolean
}

const CateItem: React.FC<YourComponentProps> = ({ text, color, isSelected }) => {
  const calculateBorderColor = (baseColor: string, factor: number): string => {
    const hex = baseColor.replace('#', '');
    const num = parseInt(hex, 16);
    let r = (num >> 16) + factor;
    let g = ((num >> 8) & 255) + factor;
    let b = (num & 255) + factor;

    r = Math.max(0, Math.min(255, r));
    g = Math.max(0, Math.min(255, g));
    b = Math.max(0, Math.min(255, b));

    return `#${(g | (b << 8) | (r << 16)).toString(16).padStart(6, '0')}`;
  };

  const calculateContrastColor = (baseColor: string): string => {
    const hex = baseColor.replace('#', '');
    const num = parseInt(hex, 16);
    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    return brightness > 125 ? '#000000' : '#ffffff';
  };

  const borderColor = calculateBorderColor(color.toString(), -20);
  const textColor = calculateContrastColor(color.toString());

  return (
    <View style={{width:100, height:120, position:"relative", top:12, left:10}}>
      <View
        style={{
          width: 81.53,
          height: 108,
          left: -8,
          top: -12,
          position: 'absolute',
          borderRadius: 50,
          borderWidth: 1,
          borderColor: borderColor,
          opacity:isSelected?1:0.1
        }}
      />
      <View
          style={{
            width: 64.78,
            height: 86.98,
            backgroundColor: color,
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 10,
            opacity:isSelected?1:0.1
          }}
        >
        <Text>🍕</Text>
        <Text
            style={{
              color: textColor,
              fontSize: 12,
              fontWeight: '500',
              letterSpacing: 0.5,
            }}
          >
          {text}
        </Text>
      </View>
    </View>
  );
};

export default CateItem;