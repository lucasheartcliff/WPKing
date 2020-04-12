import {createStore} from 'redux';

const reducer = () =>{
    const state = {
        theme:'light',
        activeSwitch: true,
        imageList: [],
    }

    return state
}

const store = createStore(reducer)

export default store