import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Switch, Text } from 'react-native-paper';
import color from 'src/assets/jss/colors';

const OptionItem = props => {
  const { theme, value, text, onValueChange, disabled } = props;

  const styles = StyleSheet.create({
    optionItem: {
      flexDirection: 'row',
      padding: 10,
    },
    text: {
      color: color[theme].secondary,
      marginTop: 1,
      fontSize: 14,
    },
  });
  return (
    <View style={styles.optionItem}>
      <Text style={styles.text}>{text}</Text>
      <Switch
        value={value}
        color={color.primary}
        trackColor={{ false: '#ddd', true: !disabled ? color.secondary: '#ddd' }}
        onValueChange={() => {
          onValueChange(value);
        }}
        disabled={disabled}
      />
    </View>
  );
};

export default OptionItem;
