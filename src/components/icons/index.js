import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

Icon.loadFont();

const IconButton = (props) => {
    const { 
        icon,
        size,
        color,
        ...rest
    } = props;
    
    return (
        <TouchableOpacity {...rest}>
            <Icon name={icon} size={size} color={color} />
        </TouchableOpacity>
    )
}

export default IconButton;