import React from 'react';
import {View, Text} from 'react-native';
import IconButton from 'src/components/icons';


const Header = (props) => {
    return(
        <View style={styleView}>
            <IconButton icon={'bars'} size={24} color={'#aaa'}/>
        </View>
    )

}

const styleView = {
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    marginBottom:10
}

export default Header;