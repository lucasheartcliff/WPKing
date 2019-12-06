import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, Dimensions } from 'react-native';
import { openDatabase, insertOnDatabase, fetchOnDatabase, deleteAllOnDatabase } from 'src/services/database';
import selectImage from 'src/services/selectImage';
import { NavBar } from 'galio-framework';
import Header from 'src/components/header';
import IconButton from 'src/components/icons'
import { toggleDrawer } from 'react-navigation-drawer/lib/typescript/src/routers/DrawerActions';

let { width } = Dimensions.get('window');
let numberGrid = 3;
let itemWidth = width / numberGrid;


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


const getImageFromStorage = async () => {
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

const ImageContainer = ({ navigation }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    setImageOnList(setImages);
  });



  return (
    <View style={{ flex: 1 }}>
      <NavBar
        left={
          <IconButton
            icon={"menu"}
            size={18} 
            onPress={()=>{navigation.toggleDrawer()}}
          />
        }
        rightStyle={{ alignItems: 'center' }}
      />
      <FlatList
        data={images}
        keyExtractor={item => item.uri}
        numColumns={numberGrid}
        renderItem={({ item }) => {
          return (
            <Image style={{ width: itemWidth, height: itemWidth }} source={{ uri: item.uri }} />
          );
        }}
      />
    </View>
  );
};

export default ImageContainer;