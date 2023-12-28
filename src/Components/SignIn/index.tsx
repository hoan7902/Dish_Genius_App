import { RootScreens } from '@/Screens';
import { Colors } from '@/Theme/Variables';
import { signIn, signUp } from '@/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { VStack } from 'native-base';
import React, { memo, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import SvgUri from 'react-native-svg-uri';
import BaseModal from '../BaseModal';
import BaseButton from '../BaseButton';
import { setUserId } from '@/Store/reducers';
import { useDispatch } from 'react-redux';

interface SignInProps {
  navigation?: StackNavigationProp<any, any>;
  isSignUp?: boolean;
}

const SignIn:React.FC<SignInProps> = ({ navigation, isSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isHidePassword, setIsHidePassword] = useState(true);
  const [isShowMessageError, setIsShowMessageError] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const toggleShowPassword = () => setIsHidePassword(!isHidePassword);

  const dispatch = useDispatch();

  const handleSignIn = async () => {
    if (isSignUp) { // Đăng ký
      const res = await signUp(email, password);
      if (!res) setIsShowMessageError(true);
      else setIsShowMessageError(false);
      await AsyncStorage.setItem('token', res.data.token);
      await AsyncStorage.setItem('userId', res.data.user.userId);
      dispatch(setUserId({ userId: res.data.user.userId }));
      setIsModalVisible(true);
    } else { // Đăng nhập
      const res = await signIn(email, password);
      if (!res) setIsShowMessageError(true);
      else setIsShowMessageError(false);
      await AsyncStorage.setItem('token', res.data.token);
      await AsyncStorage.setItem('userId', res.data.user.userId);
      dispatch(setUserId({ userId: res.data.user.userId }));
      navigation?.navigate(RootScreens.HOME);
    }
  };
  return (
    <VStack style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.WHITE }}>
      <View style={{ marginBottom: 20, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 5 }}>
        <Text style={{ color: Colors.NAVY, fontWeight: 700, fontSize: 22 }}>{isSignUp ? 'Sign Up' : 'Welcome Back!'}</Text>
        <Text>{isSignUp ? 'Please fill information' : 'Please enter your account here'}</Text>
      </View>
      
      {/* Email Input */}
      <TextInput
        style={{
          width: 327,
          height: 56,
          backgroundColor: 'white',
          borderRadius: 32,
          borderWidth: 1,
          borderColor: '#D0DBEA',
          paddingLeft: 40,
          marginBottom: 20,
        }}
        placeholder="Email"
        value={email}
        onChangeText={handleEmailChange}
      />
      {/* Password Input */}
      <View style={{ position: 'relative' }}>
        <TextInput
          style={{
            width: 327,
            height: 56,
            backgroundColor: 'white',
            borderRadius: 32,
            borderWidth: 1,
            borderColor: '#D0DBEA',
            paddingLeft: 40,
            marginBottom: 20,
          }}
          placeholder="Password"
          secureTextEntry={isHidePassword}
          value={password}
          onChangeText={handlePasswordChange}
        />
        <TouchableOpacity onPress={toggleShowPassword} style={{ position: 'absolute', top: 16, right: 24 }}>
          <SvgUri source={require('../../../assets/EyePassword.svg')} />
        </TouchableOpacity>
      </View>
      {isShowMessageError && <View style={{ paddingHorizontal: 40 }}>
        <Text style={{ color: Colors.ERROR }}>Invalid password. Something went wrong.</Text>
      </View>}
      <View>
        <BaseButton
          buttonText={isSignUp ? "Sign up" : "Sign in"}
          buttonColor={Colors.PRIMARY}
          buttonTextColor="white"
          onPress={handleSignIn}
        />
        <BaseButton
          flag={true}
          iconSource={require('../../../assets/Google.svg')}
          buttonText="Google"
          buttonColor="#FF5842"
          buttonTextColor="white"
        />

        {isSignUp && <BaseModal
          isModalVisible={isModalVisible}
          onClose={toggleModal}
          onPressButton={() => {
            navigation?.navigate(RootScreens.WELCOME);
            setIsModalVisible(false);
          }}
          title="Register Successfully"
          description="Return to the login page to log in"
        />}

        {isSignUp ? <View style={{ flexDirection: 'row', marginTop: 15, justifyContent: 'center' }}>
          <Text style={{ color: '#2E3E5C', fontSize: 15, fontWeight: '500', marginRight: 10 }}>
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation?.navigate(RootScreens.SIGNIN)} >
            <Text style={{ color: '#1FCC79', fontSize: 15, fontWeight: '700' }}>
              Sign In
            </Text>
          </TouchableOpacity>
        </View> : <View style={{ flexDirection: 'row', marginTop: 15, justifyContent: 'center' }}>
          <Text style={{ color: '#2E3E5C', fontSize: 15, fontWeight: '500', marginRight: 10 }}>
            Don’t have any account?
          </Text>
          <TouchableOpacity onPress={() => navigation?.navigate(RootScreens.SIGNUP)} >
            <Text style={{ color: '#1FCC79', fontSize: 15, fontWeight: '700' }}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>}
      </View>
    </VStack>
  );
};

export default memo(SignIn);
