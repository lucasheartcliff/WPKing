import React, { useState, useEffect, useCallback } from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Appbar, FAB } from 'react-native-paper';
import selectImage from 'src/services/selectImage';
import color from 'src/assets/jss/colors';
import ImageCard from 'src/components/ImageCard';

import { setImageMap } from 'src/util';

import {
  insertOnDatabase,
  fetchOnDatabase,
  deleteOnDatabase,
} from 'src/services/database';

let numberGrid = 3;

const setImageOnList = async imagesMap => {
  try {
    const imagesArray = await selectImage();

    const keys = Object.keys(imagesMap);
    const mapId = keys.length === 0 ? 0 : Math.max(...keys) + 1;

    await imagesArray.forEach((image, index) => {
      let id = mapId + index;
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

const deleteSelectedImages = selected => {
  for (const [key, value] of selected) {
    if (value) {
      deleteOnDatabase('image', key).catch(e => console.error(e));
    }
  }
};

const ImageContainer = ({ navigation }) => {
  const theme = useSelector(state => state.theme);
  const images = useSelector(({ imageList }) => imageList);
  const dispatch = useDispatch();

  const [screenWidth, setScreenWidth] = useState();

  const [selected, setSelected] = useState(new Map());
  const [editMode, setEditMode] = useState(false);

  const onSelect = useCallback(
    id => {
      console.log(selected);
      const newSelected = new Map(selected);
      newSelected.set(id, !selected.get(id));
      setSelected(newSelected);
      setEditMode(checkEditMode(newSelected));
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
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Action
          icon={'menu'}
          color={color[theme].secondary}
          onPress={() => navigation.toggleDrawer()}
        />
        <Appbar.Content color={color[theme].secondary} title="Painel" />
        {editMode
          ? ((
              <Appbar.Action
                icon={'format-list-checks'}
                color={color[theme].secondary}
                onPress={() => {
                  console.log('select all click');
                }}
              />
            ),
            (
              <Appbar.Action
                icon={'delete'}
                color={color[theme].secondary}
                onPress={async () => {
                  await deleteSelectedImages(selected);
                  setEditMode(false);
                  setSelected(new Map());
                  const data = await fetchOnDatabase('image');
                  dispatch({
                    type: 'updateList',
                    imageList: await setImageMap(data),
                  });
                }}
              />
            ))
          : null}
      </Appbar.Header>
      <View style={styles.listImage}>
        <FlatList
          data={Object.values(images)}
          keyExtractor={item => item.id}
          numColumns={numberGrid}
          renderItem={({ item }) => (
            <ImageCard
              uri={item.uri}
              style={styles.image}
              selected={!!selected.get(item.id) && editMode}
              onPress={() => {
                if (editMode) {
                  onSelect(item.id);
                }
              }}
              onLongPress={() => {
                if (!editMode) {
                  onSelect(item.id);
                  setEditMode(true);
                }
              }}
            />
          )}
          extraData={selected}
        />
      </View>
      {!editMode ? (
        <FAB
          style={styles.fab}
          icon="image-plus"
          onPress={async () => {
            await setImageOnList(images);
            const data = await fetchOnDatabase('image');
            dispatch({
              type: 'updateList',
              imageList: await setImageMap(data),
            });
          }}
        />
      ) : null}
    </SafeAreaView>
  );
};

export default ImageContainer;
