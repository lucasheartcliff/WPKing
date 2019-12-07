import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

Icon.loadFont();

const MaterialIcon = (props) => {
    const {
        name,
        size,
        color,
        ...rest
    } = props;

    return (
        <Icon name={name} size={size} color={color} {...rest} />
    )
}

export default MaterialIcon;