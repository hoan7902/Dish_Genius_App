import { useAppSelector } from '@/Hooks/redux';
import { RootScreens } from '@/Screens';
import { Colors } from '@/Theme/Variables';
import { getUserProfile } from '@/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button, HStack, ScrollView, VStack } from 'native-base';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import SvgUri from 'react-native-svg-uri';
import BaseButton from '../BaseButton';
import { setUserId } from '@/Store/reducers';
import { useDispatch } from 'react-redux';

interface ProfileProps {
  navigation?: StackNavigationProp<any, any>;
  isSignUp?: boolean;
}

const Profile:React.FC<ProfileProps> = ({ navigation }) => {
  const userId = useAppSelector(state => state.user.userId);
  const [userInfo, setUserInfo] = useState();
  const dispatch = useDispatch();

  const fetchUserProfile = useCallback(async () => {
    const res = await getUserProfile();
    setUserInfo(res.data);
  }, []);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleLogout = useCallback(async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('userId');
    dispatch(setUserId({ userId: null }));
    navigation?.navigate(RootScreens.HOME);
  }, []);

  if (!userId) {
    return <View style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <BaseButton
        buttonText="Sign in"
        buttonColor={Colors.PRIMARY}
        buttonTextColor="white"
        onPress={() => navigation?.navigate(RootScreens.SIGNIN)}
        width={250}
      />
    </View>;
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
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
        <VStack style={{ paddingHorizontal: 20, marginTop: 120 }}>
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
        <VStack style={{ paddingHorizontal: 20, marginTop: 30, marginBottom:30 }}>
          <VStack style={{ gap: 5 }}>
            <Text style={styles.textTitleInfo}>Account</Text>
            <TouchableOpacity 
            style={{ alignItems: 'center', display: 'flex', flexDirection: 'row', gap: 10 }} 
            onPress={() => navigation?.navigate(RootScreens.EDIT_PASSWORD)}
          >
              <SvgUri source={require('../../../assets/lock.svg')} />
              <Text style={styles.textDetailInfo}>Change password</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ alignItems: 'center', display: 'flex', flexDirection: 'row', gap: 10 }} onPress={handleLogout}>
              <SvgUri source={require('../../../assets/logout.svg')} />
              <Text style={styles.textDetailInfo}>Logout</Text>
            </TouchableOpacity>
          </VStack>
        </VStack>
      </ScrollView>
    </View>
  
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'relative',
    backgroundColor: Colors.PRIMARY,
    marginBottom:120,
  },
  scrollView: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    position: 'relative',
    paddingBottom:50,
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
