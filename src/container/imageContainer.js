import React, { useState, useEffect } from 'react';
import { View, Button, Text, FlatList, Image } from 'react-native';

import {useNavigation} from 'react-navigation';
import { DrawerActions } from 'react-navigation/routers';

import { openDatabase, insertOnDatabase, fetchOnDatabase, deleteAllOnDatabase } from 'src/services/database';
import selectImage from 'src/services/selectImage';



const setImageOnList = async (setState) => {
  try {
    const realm = await openDatabase();
    let res = await fetchOnDatabase(realm, 'image');
    
    let data = [];
    for (let i = 0; i < res.length; i++) {
      data.push(res[`${i}`]);
    }

    await setState(data);
    //realm.close();
  } catch (error) {
    console.log(error);
  }
}


const getImageOnStorage = async () => {
  try {
    const imagesArray = await selectImage();
    const realm = await openDatabase();

    await imagesArray.map(image => {
      insertOnDatabase(realm, 'image', { "uri": image.path });
    });
    //realm.close();
  } catch (error) {
    console.log(error);
  }
}

const ImageContainer = () => {
  const [images, setImages] = useState([]);
  const navigation = useNavigation();


  useEffect(() => {
    setImageOnList(setImages);
  });

  return (
    <View style={{ flex: 1}}>
      <Button title={"Get Image"} onPress={() => { getImageOnStorage() }} />
      <Button title={"Open Drawer"} onPress={() => { navigation.dispatch(DrawerActions.openDrawer()) }} />
      <FlatList
        data={images}
        keyExtractor={item => item.uri}
        numColumns={3}
        renderItem={({ item }) => {
          return (
            <View style={{ flex: 1, margin: 3, alignItems: 'flex-start', justifyContent: 'center' }}>
              <Image
                style={{ width: 100, height: 100 }}
                source={{ uri: item.uri }}
              />
            </View>
          );
        }}
      />
    </View>
  );
};

export default ImageContainer;