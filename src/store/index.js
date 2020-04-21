import { createStore } from 'redux';
import { fetchOnDatabase } from 'src/services/database';

const getInitialValues = () => {
  let state = {
    theme: 'light',
    order: [],
    language: 'english',
    backgroundService: true,
    timeToChange: 900,
    imageList: {},
  };
  fetchOnDatabase('image')
    .then(imageList => {
      state.imageList = imageList || {};
    })
    .catch(error => {
      console.error('Get Images Error: ', error);
    });

  fetchOnDatabase('settings')
    .then(settings => {
      if (settings) {
        const {
          theme,
          backgroundService,
          timeToChange,
          language,
          order,
        } = settings[0];

        state.theme = theme || state.theme;
        state.backgroundService =
          backgroundService === undefined
            ? state.backgroundService
            : JSON.parse(backgroundService);
        state.timeToChange = timeToChange || state.timeToChange;
        state.language = language || state.language;
        state.order = order || state.order;
      }
    })
    .catch(error => {
      console.error('Get Settings Error: ', error);
    });
  return state;
};

let initialState;
initialState = initialState ? initialState : getInitialValues();
const reducer = (state = initialState, action) => {
  let newState = state;
  switch (action.type) {
    case 'updateList':
      newState = { ...state, imageList: action.imageList };
    case 'switchTheme':
      newState = { ...state, theme: action.theme };
    case 'updateTime':
      newState = { ...state, timeToChange: action.timeToChange };

    case 'toggleService':
      newState = { ...state, backgroundService: action.backgroundService };
  }
  return newState;
};

const store = createStore(reducer);
export default store;
