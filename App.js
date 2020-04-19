import React from 'react';
import { Provider } from 'react-redux';
import MainNavigator from 'src/container';

import store from 'src/store';
import { fetchOnDatabase } from 'src/services/database';

const App = () => {
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
};

export default App;
