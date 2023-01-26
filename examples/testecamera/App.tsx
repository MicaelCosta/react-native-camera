import React, {useState, useRef} from 'react';
import {Button, View, Dimensions, TouchableOpacity, Alert} from 'react-native';
import {RNCamera} from 'react-native-camera';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

export function App() {
  const cameraRef = useRef<RNCamera | null>(null);

  const [openPhoto, setOpenPhoto] = useState(false);
  const [openBarcode, setOpenBarcode] = useState(false);
  const [openTextRecognition, setOpenTextRecognition] = useState(false);

  async function takePhoto() {
    const newPhoto = await cameraRef.current?.takePictureAsync();
    setOpenPhoto(false);
    Alert.alert('Take Photo', JSON.stringify(newPhoto));
  }

  function onBarCodeRead(event: any) {
    setOpenBarcode(false);
    Alert.alert('Barcode', JSON.stringify(event));
  }

  function onTextRecognized(response: any) {
    setOpenTextRecognition(false);
    Alert.alert('Text Recognized', JSON.stringify(response));
  }

  return (
    <View
      style={{flex: 1, alignItems: 'center', justifyContent: 'space-around'}}>
      <Button title="Take Photo" onPress={() => setOpenPhoto(true)} />
      <Button title="Barcode" onPress={() => setOpenBarcode(true)} />
      <Button
        title="Text recognition"
        onPress={() => setOpenTextRecognition(true)}
      />

      {openTextRecognition && (
        <RNCamera
          ref={cameraRef}
          style={{height: HEIGHT}}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.torch}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera phone',
          }}
          onTextRecognized={onTextRecognized}>
          <View style={{height: HEIGHT, width: WIDTH}} />
        </RNCamera>
      )}

      {openBarcode && (
        <RNCamera
          ref={cameraRef}
          style={{height: HEIGHT}}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.torch}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera phone',
          }}
          onBarCodeRead={onBarCodeRead}>
          <View style={{height: HEIGHT, width: WIDTH}} />
        </RNCamera>
      )}

      {openPhoto && (
        <RNCamera
          ref={cameraRef}
          style={{height: HEIGHT}}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.torch}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera phone',
          }}>
          <TouchableOpacity
            onPress={takePhoto}
            style={{
              backgroundColor: '#fff',
              height: 78,
              width: 78,
              borderRadius: 39,
            }}
          />
        </RNCamera>
      )}
    </View>
  );
}