import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import ImageContainer from 'src/container/imageContainer';
import SettingsContainer from 'src/container/settingsContainer';

const App = createDrawerNavigator({
  Dashboard:{
    screen: ImageContainer
  },
  Settings:{
    screen:SettingsContainer
  }

})

export default createAppContainer(App);