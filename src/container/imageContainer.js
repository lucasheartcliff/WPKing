import React, {useState, useEffect} from 'react';
import {View, FlatList, Dimensions, StyleSheet} from 'react-native';
import {Appbar, FAB} from 'react-native-paper';
import selectImage from 'src/services/selectImage';
import color from 'src/assets/jss/colors';
import ImageCard from 'src/components/ImageCard';
import {
  openDatabase,
  insertOnDatabase,
  fetchOnDatabase,
} from 'src/services/database';

//import Button from 'src/components/Button';

let {width} = Dimensions.get('window');
let numberGrid = 3;
let itemWidth = (width - 20) / numberGrid;

const setImageOnList = async setState => {
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
};

const getImageFromStorage = async () => {
  try {
    const imagesArray = await selectImage();
    const realm = await openDatabase();

    await imagesArray.map(image => {
      insertOnDatabase(realm, 'image', {uri: image.path});
    });
    //realm.close();
  } catch (error) {
    console.log(error);
  }
};

const ImageContainer = ({navigation}) => {
  const [images, setImages] = useState([]);
  const theme = 'light';

  useEffect(() => {
    setImageOnList(setImages);
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: color[theme].background,
    },
    header: {
      backgroundColor: color[theme].primary,
    },
    image: {
      width: itemWidth,
      height: itemWidth,
      margin: 3,
      elevation: 6,
    },
    fab: {
      position: 'absolute',
      backgroundColor: color[theme].primary,
      color: color.white,
      margin: 15,
      right: 0,
      bottom: 0,
    },
  });

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Action
          icon={'menu'}
          color={color[theme].secondary}
          onPress={() => navigation.toggleDrawer()}
        />
      </Appbar.Header>
      <FlatList
        data={images}
        keyExtractor={item => item.uri}
        numColumns={numberGrid}
        renderItem={({item}) => {
          return <ImageCard uri={item.uri} style={styles.image} />;
        }}
      />
      <FAB
        style={styles.fab}
        icon="image-plus"
        onPress={() => console.log({width, color})}
      />
    </View>
  );
};

export default ImageContainer;
