import React from 'react';
import { Text, View } from 'react-native';

const SettingsContainer = ({navigation}) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text onPress={()=>{navigation.toggleDrawer()}}>Home Screen</Text>
      </View>
    )
}

export default SettingsContainer;