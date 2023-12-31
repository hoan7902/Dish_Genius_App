import { RootScreens } from '@/Screens';
import { Colors } from '@/Theme/Variables';
import { getUserProfile, updateUserProfile } from '@/api';
import { StackNavigationProp } from '@react-navigation/stack';
import { ScrollView, VStack } from 'native-base';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import SvgUri from 'react-native-svg-uri';
import BaseButton from '../BaseButton';
import BaseModal from '../BaseModal';

type EditProfileProps = {
  navigation: StackNavigationProp<any, RootScreens.HOME>;
};

const EditProfile: React.FC<EditProfileProps> = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState();
  const [email, setEmail] = useState(userInfo?.email || '');
  const [phone, setPhone] = useState(userInfo?.phone || '');
  const [name, setName] = useState(userInfo?.name || '');

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleUpdateUserProfile = useCallback(async () => {
    const res = await updateUserProfile({
      name, phone, email
    });
    if (res) {
      setIsModalVisible(true);
      setIsError(false);
    } else {
      setIsError(true);
    }
  }, [email, phone, name]);

  const handleEmailChange = useCallback((text) => {
    setEmail(text);
  }, [email]);

  const handleNameChange = useCallback((text) => {
    setName(text);
  }, [name]);

  const handlePhoneChange = useCallback((text) => {
    setPhone(text);
  }, [phone]);

  const fetchUserProfile = useCallback(async () => {
    const res = await getUserProfile();
    setUserInfo(res.data);
  }, []);

  useEffect(() => {
    setEmail(userInfo?.email);
    setPhone(userInfo?.phone);
    setName(userInfo?.name);
  }, [userInfo]);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.banner}>
          <TouchableOpacity style={styles.iconBack} onPress={() => navigation.navigate(RootScreens.PROFILE)}>
            <SvgUri 
            source={require('../../../assets/arrow-left.svg')}
          />
          </TouchableOpacity>
          <Text style={styles.textTitle}>Edit Profile</Text>
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
              <Text style={styles.textTitleInfo}>Name: </Text>
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
              placeholder="Name"
              value={name}
              onChangeText={handleNameChange}
            />
            </VStack>
            <VStack style={{ gap: 10 }}>
              <Text style={styles.textTitleInfo}>Email: </Text>
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
              placeholder="Email"
              value={email}
              onChangeText={handleEmailChange}
            />
            </VStack>
            <VStack style={{ gap: 10 }}>
              <Text style={styles.textTitleInfo}>Phone: </Text>
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
              placeholder="Phone"
              value={phone}
              onChangeText={handlePhoneChange}
            />
            </VStack>

            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginBottom:40}}>
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
        {isModalVisible && <BaseModal
        isModalVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onPressButton={() => navigation?.navigate(RootScreens.PROFILE)}
        title="Update Success"
        description="Your profile has been updated,
        you can see it on your profile"
        buttonText="Back to profile"
      />}
      </ScrollView>

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
    gap: 25,
  },
  scrollView: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    // marginTop: -100,
    marginBottom:100,
    position: 'relative',
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
