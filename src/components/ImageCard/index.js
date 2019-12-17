import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {Surface} from 'react-native-paper';

const ImageCard = props => {
  const {uri, ...rest} = props;

  return (
    <Surface {...rest}>
      <Image style={styles.image} source={{uri: uri}} />
    </Surface>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
});
export default ImageCard;
