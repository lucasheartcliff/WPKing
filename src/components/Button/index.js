import React from 'react';
import { Button } from 'galio-framework';
import * as pallete from 'src/assets/jss/colors';

const setColor = (color) => {
    switch (color) {
        case "primary":
            return true
        default:
            return false;
            break;
    }
}

const MaterialButton = (props) => {
    const { color, children, ...rest } = props;

    return (
        <Button color={setColor(color) ? pallete[color] : color} {...rest}>
            {children}
        </Button>
    )
}

export default MaterialButton;