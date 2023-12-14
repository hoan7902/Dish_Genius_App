import React, { memo } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootScreens } from '..';
import { OnboardFlow } from 'react-native-onboard';
import { Image, ViewStyle } from 'react-native';

const buttonStyled: ViewStyle = {
  backgroundColor: '#1FCC79',
};

type WelcomeScreenProps = {
  navigation: StackNavigationProp<any, RootScreens.WELCOME>;
};

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => (
    <OnboardFlow
      pages={[
        {
          title: 'Welcome to Dish Genius!',
          subtitle: 'Explore diverse dishes with ingredients you already have.',
          imageUri: Image.resolveAssetSource(require('../../../assets/Onboarding01.png')).uri,
        },
        {
          title: 'Discover New Tastes',
          subtitle: 'Share your ingredients, and I\'ll suggest dishes.',
          imageUri: Image.resolveAssetSource(require('../../../assets/Onboarding02.png')).uri,
        },
        {
          title: 'Enjoy Home Cooking',
          subtitle: 'Get cooking instructions and manage your favorite recipes.',
          imageUri: Image.resolveAssetSource(require('../../../assets/Onboarding03.png')).uri,
        }
      ]}
      type={'fullscreen'}
      primaryButtonStyle={buttonStyled}
      paginationColor='#bbb'
      paginationSelectedColor='#1FCC79'
      onDone={() => navigation.navigate(RootScreens.HOME)}
    />
  );

export default memo(WelcomeScreen);
