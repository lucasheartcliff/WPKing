import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import color from 'src/assets/jss/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const renderIcon = (title, focused) => {
  switch (title) {
    case 'Painel':
      return (
        <Icon
          name="view-grid"
          size={18}
          color={focused ? 'white' : color.primary}
        />
      );
    case 'Configurações':
      return (
        <Icon
          name="settings"
          size={18}
          color={focused ? 'white' : color.primary}
        />
      );
    default:
      return null;
  }
};

const DrawerItem = props => {
  const {title, focused, ...rest} = props;
  const theme = 'light';

  const styles = StyleSheet.create({
    defaultStyle: {
      flexDirection: 'row',
      backgroundColor: color[theme].primary,
      paddingVertical: 15,
      paddingHorizontal: 14,
    },
    activeStyle: {
      backgroundColor: color.primary,
      borderRadius: 4,
    },
    shadow: {
      shadowColor: color.black,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowRadius: 8,
      shadowOpacity: 0.1,
    },
  });

  const drawerItem = [
    styles.defaultStyle,
    focused ? [styles.activeStyle, styles.shadow] : null,
  ];

  return (
    <TouchableOpacity {...rest}>
      <View style={drawerItem}>
        <View style={{marginRight: 5}}>{renderIcon(title, focused)}</View>
        <View style={{alignItems: 'center'}}>
          <Text
            size={14}
            bold={focused ? true : false}
            style={{color: focused ? 'white' : color[theme].secondary}}>
            {title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DrawerItem;
