import { createStore } from 'redux';
import { fetchOnDatabase } from 'src/services/database';

const getInitialValues = () => {
  let state = {
    theme: 'light',
    backgroundService: true,
    timeToChange: 900,
    imageList: {},
  };

  try {
    state = {
      ...state,
      imageList: fetchOnDatabase('image').then(res => res),
      //...(await fetchOnDatabase('settings')),
    };

    return state;
  } catch (error) {
    console.error(error);
  }
};
let initialState;
initialState = initialState || getInitialValues();
const reducer = (state = initialState, action) => {
  //console.log('reducer', state, action);
  switch (action.type) {
    case 'initialState':
      const { type, ...actionState } = action;
      return { ...state, ...actionState };
    case 'switchTheme':
      return { ...state, theme: action.theme };
    case 'updateList':
      console.log('updatingList...');
      return { ...state, imageList: action.imageList };
    case 'updateTime':
      return { ...state, timeToChange: action.timeToChange };
    case 'toggleService':
      return { ...state, backgroundService: action.backgroundService };
    default:
      return state;
  }
};

const store = createStore(reducer);
export default store;
