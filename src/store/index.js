import { createStore } from 'redux';
import { fetchOnDatabase } from 'src/services/database';
import { setImageMap } from 'src/util';

const getInitialValues = () => {
  let state = {
    loading: true,
    theme: 'light',
    order: [],
    language: 'english',
    backgroundService: true,
    timeToChange: 900,
    imageList: {},
  };
  fetchOnDatabase('image')
    .then(imageList => {
      if (imageList !== undefined) {
        state.imageList = setImageMap(imageList);
      }
    })
    .catch(error => {
      console.error('Get Images Error: ', error);
    });

  fetchOnDatabase('settings')
    .then(settings => {
      if (settings !== undefined && settings[0]) {
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
  state.loading = false;
  return state;
};

let initialState;
initialState = initialState ? initialState : getInitialValues();
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'updateList':
      return { ...state, imageList: action.imageList || {} };
    case 'switchTheme':
      return { ...state, theme: action.theme };
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
