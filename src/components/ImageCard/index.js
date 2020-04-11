import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Surface} from 'react-native-paper';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

const ImageCard = props => {
  const {uri, selected, ...rest} = props;

  return (
    <TouchableWithoutFeedback {...rest}>
      <Surface>
        <View style={selected ? styles.selected : null}>
          <Image style={styles.image} source={{uri: uri}} />
        </View>
      </Surface>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
  selected: {
    opacity: 0.5,
  },
});
export default ImageCard;
