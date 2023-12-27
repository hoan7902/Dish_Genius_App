import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootScreens } from '..';
import { Camera } from 'expo-camera';
import SvgUri from 'react-native-svg-uri';

type ScanScreenProps = {
  navigation: StackNavigationProp<any, RootScreens.SCAN>;
};

const ScanIcon = () => (
  <View style={{ borderRadius: 10, justifyContent: 'center' }}>
    <SvgUri source={require('../../../assets/Scanner.svg')} />
  </View>
);

const ScanScreen: React.FC<ScanScreenProps> = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [cameraRef, setCameraRef] = useState<Camera | null>(null);
  const [capturedImage, setCapturedImage] = useState<string|null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <ActivityIndicator style={styles.loadingIndicator} />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  const takePicture = async () => {
    if (cameraRef) {
      try {
        const photo = await cameraRef.takePictureAsync();
        setCapturedImage(photo?.uri);
        navigation.navigate(RootScreens.SCANNEDDETAIL);
      } catch (error) {
        console.error('Error taking picture:', error);
      }
    }
  };

  // const sendImageToAPI = async () => {
  //   if (capturedImage) {
  //     try {
  //       const formData = new FormData();
  //       formData.append('image', {
  //         uri: capturedImage,
  //         name: 'photo.jpg',
  //         type: 'image/jpeg',
  //       });

  //       const response = await fetch('YOUR_API_ENDPOINT', {
  //         method: 'POST',
  //         body: formData,
  //         headers: {
  //           'Content-Type': 'multipart/form-data',
  //         },
  //       });

  //       // Xử lý response từ API (nếu cần)
  //       const data = await response.json();
  //       console.log('API Response:', data);
  //     } catch (error) {
  //       console.error('Error sending image to API:', error);
  //     }
  //   }
  // };

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.back}
        ref={(ref) => setCameraRef(ref)}
      >
        <TouchableOpacity style={styles.iconBack} onPress={() => navigation.navigate(RootScreens.HOME)}>
          <SvgUri source={require('../../../assets/arrow-left.svg')} />
        </TouchableOpacity>
        <View style={styles.cameraContent}>
          <ScanIcon />
          <View style={styles.scanButtonContainer}>
            <TouchableOpacity onPress={takePicture}>
              <SvgUri source={require("../../../assets/Scan.svg")} />
            </TouchableOpacity>
          </View>
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  iconBack: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 1,
  },
  cameraContent: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanButtonContainer: {
    position: 'absolute',
    bottom: 50,
    zIndex: 1,
  },
});

export default memo(ScanScreen);
