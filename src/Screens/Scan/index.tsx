import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootScreens } from '..';
import { Camera, CameraType } from 'expo-camera';
import SvgUri from 'react-native-svg-uri';
import { getListIngredients } from '@/api';
import * as FileSystem from 'expo-file-system';
import { setQuery, setScanIngredients } from '@/Store/reducers';
import { useDispatch } from 'react-redux';

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
  const dispatch = useDispatch();

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
        const options = { quality: 1, base64: true,  format: 'jpg' };
        const photo = await cameraRef.takePictureAsync(options);
  
        setCapturedImage(photo?.uri);
        const formData = new FormData();
        const fileUri = photo.uri;
        console.log({fileUri});

        const response = await fetch(fileUri);
        const blob = await response.blob();
        console.log({blob, fileUri});
        const filename = fileUri.split('/').pop();

        // Infer the type of the image
        const match = /\.(\w+)$/.exec(filename || '');
        const type = match ? `image/${match[1]}` : `image`;

        formData.append('image', { uri: fileUri, name: filename, type });
  
        // Send the FormData with base64 image data to the API
        await sendImageToAPI(formData);
        
        // Navigate to the 'SCANNEDDETAIL' screen
        navigation.navigate(RootScreens.SCANNEDDETAIL);
      } catch (error) {
        console.error('Error taking picture:', error);
      }
    }
  };
  

  const sendImageToAPI = async (formData: FormData) => {
    try {
      const data = await getListIngredients(formData);
      console.log({data});

      // dispatch(setScanIngredients({listScanIngredients:data.ingredients}));

      //mock
      const ingredients = [
        "watermelon",
        "melon",
        "papaya",
        "grapefruit",
        "strawberry",
        "broad beans"
      ];
      const query = ingredients.reduce((result, item)=>result+" "+item);
      dispatch(setScanIngredients({listScanIngredients:ingredients}));
      dispatch(setQuery({query}));
    } catch (error) {
      console.error('Error sending image to API:', error);
    }
  };

  const convertImageToBase64 = async (imageUri: string) => {
    try {
      const base64Image = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      return base64Image;
    } catch (error) {
      console.error('Error converting image to base64:', error);
      throw error;
    }
  };

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={CameraType.back}
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
