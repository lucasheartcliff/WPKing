import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

const Loader = ({size, color}) => {
  return (
    <View>
      <ActivityIndicator  animating={true} size={size} color={color}/>
    </View>
  );
};

export default Loader;
