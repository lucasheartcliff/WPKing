import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, Dimensions, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Appbar, FAB } from 'react-native-paper';
import selectImage from 'src/services/selectImage';
import color from 'src/assets/jss/colors';
import ImageCard from 'src/components/ImageCard';

import { insertOnDatabase, fetchOnDatabase } from 'src/services/database';

let numberGrid = 3;

const setImageOnList = async imagesMap => {
  const id = Object.keys(imagesMap).length || 0;
  console.log('id', id);
  try {
    const imagesArray = await selectImage();

    await imagesArray.map(image => {
      insertOnDatabase('image', { id: id, uri: image.path });
    });
  } catch (error) {
    console.error(error);
  }
};

const checkEditMode = selected => {
  for (const [key, value] of selected) {
    if (value) {
      return true;
    }
  }
  return false;
};

const ImageContainer = ({ navigation }) => {
  useSelector(state => {
    console.log('state in component', state);
  });
  const theme = useSelector(state => state.theme);
  const images = useSelector(state => state.imageList);
  const dispatch = useDispatch();

  const [screenWidth, setScreenWidth] = useState();
  const [selected, setSelected] = useState(new Map());
  const [editMode, setEditMode] = useState(false);

  const onSelect = useCallback(
    id => {
      const newSelected = new Map(selected);
      newSelected.set(id, !selected.get(id));
      setSelected(newSelected);
      setEditMode(checkEditMode(selected));
    },
    [selected],
  );

  useEffect(() => {
    const onChange = result => {
      let { width, height } = result.screen;

      if (width > height) {
        width = width * 0.88;
      } else {
        width = width * 0.93;
      }

      let itemWidth = width / numberGrid;

      setScreenWidth(itemWidth);
    };

    Dimensions.addEventListener('change', onChange);

    onChange({ screen: Dimensions.get('screen') });
  }, [dispatch]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: color[theme].background,
    },
    header: {
      backgroundColor: color[theme].primary,
      paddingHorizontal: 5,
    },
    listImage: {
      flex: 1,
      alignItems: 'flex-start',
    },
    image: {
      width: screenWidth,
      height: screenWidth,
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
      <View style={styles.listImage}>
        <FlatList
          data={Object.values(images)}
          keyExtractor={item => item.id}
          numColumns={numberGrid}
          renderItem={({ item }) => {
            return (
              <ImageCard
                uri={item.uri}
                style={styles.image}
                selected={!!selected.get(item.uri)}
                onPress={() => {
                  if (editMode) {
                    onSelect(item.uri);
                  }
                }}
                onLongPress={() => {
                  onSelect(item.uri);
                  setEditMode(true);
                }}
              />
            );
          }}
          extraData={selected}
        />
      </View>
      <FAB
        style={styles.fab}
        icon="image-plus"
        onPress={async () => {
          await setImageOnList(images);
          const data = await fetchOnDatabase('image');
          dispatch({ type: 'updateList', imageList: data });
        }}
      />
    </View>
  );
};

export default ImageContainer;
