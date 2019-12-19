import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import DrawerItem from 'src/components/DrawerItem';

const SideBar = props => {
  const {navigation} = props;
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
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
      height: '30%',
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
          title="Painel"
          focused={navigation.isFocused()}
          onPress={() => {
            navigation.navigate();
          }}
        />
        <DrawerItem title="Configurações" focused={navigation.isFocused()} />
      </View>

      <View style={styles.footer}>
        <Text>Footer</Text>
      </View>
    </View>
  );
};

export default SideBar;
