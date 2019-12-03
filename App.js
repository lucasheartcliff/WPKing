import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import ImageContainer from 'src/container/imageContainer';
import Icon from 'react-native-vector-icons/FontAwesome';

Icon.loadFont();

const AppNavigation = createDrawerNavigator({
  ImageContainer:{
    screen: ImageContainer,
    navigationOptions: () => ({
      drawerIcon: <Icon name={"lock"} size={20}/> 
    }),
  },
});

export default createAppContainer(AppNavigation);