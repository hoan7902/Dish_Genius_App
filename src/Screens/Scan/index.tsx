import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootScreens } from '..';
import { Camera } from 'expo-camera';
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
        const options = { quality: 1, base64: true }; // Set base64 option to true
        const photo = await cameraRef.takePictureAsync(options);
  
        // Set the captured image base64 data
        const base64Image = photo.base64;
        
        // Set the captured image URI (optional, remove if not needed)
        setCapturedImage(photo?.uri);
        // Create FormData
        const formData = new FormData();
        const fileUri = photo.uri;
        const fileName = fileUri.split('/').pop(); // Get the file name from the URI
        const fileType = 'image/jpeg'; // Adjust the file type if needed

        // Convert the image to Blob
        const fileBlob = await FileSystem.readAsStringAsync(fileUri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        formData.append('image', {
          uri: fileUri,
          name: fileName,
          type: fileType,
          data: fileBlob, // Assign the image data (Base64 encoded) to the FormData
        });
  
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

      dispatch(setScanIngredients({listScanIngredients:data.ingredients}));

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
