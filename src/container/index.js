import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import ImageContainer from 'src/container/imageContainer';
import SettingsContainer from 'src/container/settingsContainer';
import SideBar from 'src/components/SideBar';
import DrawerItem from 'src/components/DrawerItem';

const MainNavigator = createDrawerNavigator(
  {
    Dashboard: {
      screen: ImageContainer,
      navigationOptions: ({navigation}) => ({
        drawerLabel: ({focused}) => (
          <DrawerItem
            focused={navigation.isFocused()}
            screen="ImageContainer"
            title="Painel"
          />
        ),
      }),
    },
    Settings: {
      screen: SettingsContainer,
      navigationOptions: ({navigation}) => ({
        drawerLabel: ({focused}) => (
          <DrawerItem
            focused={navigation.isFocused()}
            screen="SettingsContainer"
            title="Configurações"
          />
        ),
      }),
    },
  },
  {
    contentComponent: props => <SideBar {...props} />,
  },
);

export default createAppContainer(MainNavigator);
