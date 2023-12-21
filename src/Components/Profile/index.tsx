import { RootScreens } from '@/Screens';
import { Colors } from '@/Theme/Variables';
import { getUserProfile } from '@/api';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button, HStack, VStack } from 'native-base';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import SvgUri from 'react-native-svg-uri';

interface ProfileProps {
  navigation?: StackNavigationProp<any, any>;
  isSignUp?: boolean;
}

const Profile:React.FC<ProfileProps> = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState();

  const fetchUserProfile = useCallback(async () => {
    const res = await getUserProfile();
    setUserInfo(res.data);
  }, []);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <Text style={styles.textTitle}>Profile</Text>
        <View style={styles.profileLogo}>
          <Image 
            source={require('../../../assets/profile_logo.png')}
          />
          <Button onPress={() => navigation?.navigate(RootScreens.EDIT_PROFILE)} style={styles.buttonEdit}>Edit Profile</Button>
        </View>
      </View>
      {/* Profile */}
      <VStack style={{ paddingHorizontal: 20, marginTop: 100 }}>
        <VStack style={{ gap: 5 }}>
          <Text style={styles.textTitleInfo}>Information</Text>
          <HStack style={{ alignItems: 'center' }}>
            <Text style={styles.textTitleInfo}>Email: </Text>
            <Text style={styles.textDetailInfo}>{userInfo?.email}</Text>
          </HStack>
          <HStack style={{ alignItems: 'center' }}>
            <Text style={styles.textTitleInfo}>Name: </Text>
            <Text style={styles.textDetailInfo}>{userInfo?.name || '???'}</Text>
          </HStack>
          <HStack style={{ alignItems: 'center' }}>
            <Text style={styles.textTitleInfo}>Phone: </Text>
            <Text style={styles.textDetailInfo}>{userInfo?.phone || '???'}</Text>
          </HStack>
        </VStack>
      </VStack>
  
      {/* Content */}
      <VStack style={{ paddingHorizontal: 20, marginTop: 30 }}>
        <VStack style={{ gap: 5 }}>
          <Text style={styles.textTitleInfo}>Content</Text>
          <HStack style={{ alignItems: 'center', gap: 4 }}>
            <SvgUri source={require('../../../assets/heart.svg')} />
            <Text style={styles.textDetailInfo}>Favourite Food</Text>
          </HStack>
        </VStack>
      </VStack>
  
      {/* Account */}
      <VStack style={{ paddingHorizontal: 20, marginTop: 30 }}>
        <VStack style={{ gap: 5 }}>
          <Text style={styles.textTitleInfo}>Account</Text>
          <HStack style={{ alignItems: 'center', gap: 4 }}>
            <SvgUri source={require('../../../assets/lock.svg')} />
            <Text style={styles.textDetailInfo}>Change password</Text>
          </HStack>
          <HStack style={{ alignItems: 'center', gap: 4 }}>
            <SvgUri source={require('../../../assets/logout.svg')} />
            <Text style={styles.textDetailInfo}>Logout</Text>
          </HStack>
        </VStack>
      </VStack>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'relative',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    gap: 25
  },
  banner: {
    height: 188,
    width: '100%',
    backgroundColor: Colors.PRIMARY,
    position: 'relative'
  },
  profileLogo: {
    position: 'absolute',
    bottom: -110,
    left: '50%',
    transform: [{ translateX: -70 }],
    display: 'flex',
    gap: 10
  },
  textTitle: {
    color: Colors.WHITE,
    fontWeight: '700',
    position: 'absolute',
    bottom: 90,
    left: '50%',
    transform: [{ translateX: -45 }],
    fontSize: 20
  },
  textTitleInfo: {
    color: Colors.TEXT_DARK,
    fontSize: 16,
    fontWeight: '600'
  },
  textDetailInfo: {
    color: Colors.TEXT_DARK,
    fontSize: 16
  },
  buttonEdit: {
    backgroundColor: Colors.PRIMARY,
    fontWeight: '700'
  }
});

export default memo(Profile);
