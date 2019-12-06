import React from 'react';
import { NavigationNativeContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ImageContainer from 'src/container/imageContainer';
import SettingsContainer from 'src/container/settingsContainer';

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationNativeContainer>
      <Drawer.Navigator >
        <Drawer.Screen
          name={'Painel'}
          component={ImageContainer}
          options={{
            title:'Painel',
          }}
        />
        <Drawer.Screen
          name={'Opções'}
          component={SettingsContainer}
          options={{
            title: 'Opções'
          }}
        />
      </Drawer.Navigator>
    </NavigationNativeContainer>
  );
};

export default App;