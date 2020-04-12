import React from 'react';
import {Provider} from 'react-redux';
import MainNavigator from 'src/container';

import store from 'src/store';

const App = () => (
  <Provider store={store}>
    <MainNavigator />
  </Provider>
);

export default App;
