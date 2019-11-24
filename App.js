import React from 'react';
import {
  View,
  Button
} from 'react-native';

import ImagePicker from 'react-native-image-crop-picker';
import {openDatabase,insertOnDatabase,fetchOnDatabase} from './src/services/syncDb';

//import Wallpaper from 'rnwallpaper';

const selectImage = () => {
  console.log("Selecting Image...");
  ImagePicker.openPicker({
    multiple: true
  }).then(images => {
    console.log(images);
  }).catch(error => {
    console.log(error);
    //Nothing
  });
}

const testDatabase = () => {
  try{
    openDatabase();
    insertOnDatabase('image',{id:1,uri:'imagem'});
    let result = fetchOnDatabase('image');
    console.log(result);
  }catch(error){
    console.log(error);
  }
}

const App = () => {
  return (
    <View>
      <Button title={"Select Image"} onClick={testDatabase()} />
    </View>
  );
};

export default App;