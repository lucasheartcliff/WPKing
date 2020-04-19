import { createStore } from 'redux';
import { fetchOnDatabase } from 'src/services/database';

const getInitialValues = async () => {
  let state = await {
    theme: 'light',
    backgroundService: true,
    timeToChange: 900,
    imageList: {},
  };

  try {
    state = {
      ...state,
      imageList: await fetchOnDatabase('image'),
      //...(await fetchOnDatabase('settings')),
    };

    return await state;
  } catch (error) {
    console.error(error);
  }
};

let initialState = getInitialValues()
const reducer = (state = initialState, action) => {
  console.log(initialState);
  if (!initialState) {
    getInitialValues();
    state = initialState;
  }
  console.log('reducer', state, action);
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
