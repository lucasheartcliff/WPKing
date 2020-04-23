import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import DrawerItem from 'src/components/DrawerItem';
import color from 'src/assets/jss/colors';

const SideBar = ({ navigation }) => {
  const theme = useSelector(state => state.theme);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: color[theme].primary,
    },
    header: {
      alignItems: 'center',
      justifyContent: 'center',
      height: '20%',
      width: '100%',
    },
    body: {
      width: '100%',
      height: '50%',
    },
    footer: {
      width: '100%',
      height: '20%',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>Header</Text>
      </View>

      <View style={styles.body}>
        <DrawerItem
          title="Dashboard"
          focused={navigation.isFocused('Dashboard')}
          onPress={() => {
            navigation.navigate('Dashboard');
          }}
        />
        <DrawerItem
          title="Settings"
          focused={navigation.isFocused('Settings')}
          onPress={() => {
            navigation.navigate('Settings');
          }}
        />
      </View>

      <View style={styles.footer}>
        <Text>Footer</Text>
      </View>
    </View>
  );
};

export default SideBar;
