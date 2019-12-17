import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import ImageContainer from 'src/container/imageContainer';
import SettingsContainer from 'src/container/settingsContainer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const App = createDrawerNavigator({
  Dashboard: {
    screen: ImageContainer,
    navigationOptions: ({navigation}) => ({
      title: 'Painel',
      drawerIcon: () => <Icon name={'view-grid'} size={24} />,
    }),
  },
  Settings: {
    screen: SettingsContainer,
    navigationOptions: ({navigation}) => ({
      title: 'Configurações',
      drawerIcon: (focus, tintColor) => <Icon name={'settings'} size={24} color={focus?tintColor:''} />,
    }),
  },
});

export default createAppContainer(App);
