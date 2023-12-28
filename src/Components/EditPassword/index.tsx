import { RootScreens } from '@/Screens';
import { Colors } from '@/Theme/Variables';
import { getUserProfile, updateUserPassword, updateUserProfile } from '@/api';
import { StackNavigationProp } from '@react-navigation/stack';
import { VStack } from 'native-base';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import SvgUri from 'react-native-svg-uri';
import BaseButton from '../BaseButton';
import BaseModal from '../BaseModal';

type EditProfileProps = {
  navigation: StackNavigationProp<any, RootScreens.HOME>;
};

const EditProfile: React.FC<EditProfileProps> = ({ navigation }) => {
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleUpdateUserProfile = useCallback(async () => {
    const res = await updateUserPassword({
      oldPassword, newPassword, confirmPassword
    });
    if (res) {
      setIsModalVisible(true);
      setIsError(false);
    } else {
      setIsError(false);
    }
  }, [confirmPassword, newPassword, oldPassword]);

  const handleConfirmChange = useCallback((text) => {
    setConfirmPassword(text);
  }, [confirmPassword]);

  const handleOldPasswordChange = useCallback((text) => {
    setOldPassword(text);
  }, [oldPassword]);

  const handleNewPasswordChange = useCallback((text) => {
    setNewPassword(text);
  }, [newPassword]);

  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <TouchableOpacity style={styles.iconBack} onPress={() => navigation.navigate(RootScreens.PROFILE)}>
          <SvgUri 
            source={require('../../../assets/arrow-left.svg')}
          />
        </TouchableOpacity>
        <Text style={styles.textTitle}>Edit Password</Text>
        <View style={styles.profileLogo}>
          <Image 
            source={require('../../../assets/profile_logo.png')}
          />
        </View>
      </View>
      {/* Profile */}
      <VStack style={{ paddingHorizontal: 20, marginTop: 100 }}>
        <VStack style={{ gap: 20 }}>
          <VStack style={{ gap: 10 }}>
            <Text style={styles.textTitleInfo}>Old password: </Text>
            <TextInput 
              style={{
                width: '100%',
                height: 56,
                backgroundColor: 'white',
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#A9A9A9',
                paddingLeft: 20,
              }}
              placeholder="Old password"
              value={oldPassword}
              onChangeText={handleOldPasswordChange}
            />
          </VStack>
          <VStack style={{ gap: 10 }}>
            <Text style={styles.textTitleInfo}>New password: </Text>
            <TextInput 
              style={{
                width: '100%',
                height: 56,
                backgroundColor: 'white',
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#A9A9A9',
                paddingLeft: 20,
              }}
              placeholder="New password"
              value={newPassword}
              onChangeText={handleNewPasswordChange}
              secureTextEntry={true}
            />
          </VStack>
          <VStack style={{ gap: 10 }}>
            <Text style={styles.textTitleInfo}>Confirm password: </Text>
            <TextInput 
              style={{
                width: '100%',
                height: 56,
                backgroundColor: 'white',
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#A9A9A9',
                paddingLeft: 20,
              }}
              placeholder="Old password"
              value={confirmPassword}
              onChangeText={handleConfirmChange}
              secureTextEntry={true}
            />
          </VStack>
          {isError && <View style={{ paddingHorizontal: 40 }}>
            <Text style={{ color: Colors.ERROR }}>Invalid credentials. Please check your email and password and try again.</Text>
          </View>}
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
            <BaseButton
              buttonText="Update"
              buttonColor={Colors.PRIMARY}
              buttonTextColor="white"
              onPress={handleUpdateUserProfile}
              width={250}
              marginTop={0}
            />
          </View>
        </VStack>
      </VStack>
      <BaseModal
        isModalVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onPressButton={() => navigation?.navigate(RootScreens.PROFILE)}
        title="Change Success"
        description="Your password has been changed"
        buttonText="Back to profile"
      />
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
    bottom: -70,
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
  },
  iconBack: {
    position: 'absolute',
    top: 60,
    left: 20
  }
});

export default memo(EditProfile);
