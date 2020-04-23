import React from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Surface, Appbar, Divider } from 'react-native-paper';
import color from 'src/assets/jss/colors';
import OptionItem from 'src/components/OptionItem';

import { insertOnDatabase, deleteAllOnDatabase } from 'src/services/database';

const setSettingsOnDatabase = settingsState => {
  const branchName = 'settings';
  settingsState.backgroundService = JSON.stringify(
    settingsState.backgroundService,
  );
  deleteAllOnDatabase(branchName);
  insertOnDatabase(branchName, settingsState)
    .then(() => console.info('Settings has been updated'))
    .catch(error => console.error(error));
};

const SettingsContainer = ({ navigation }) => {
  const state = useSelector(({ imageList, ...settingsState }) => settingsState);
  const dispatch = useDispatch();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: color[state.theme].background,
    },
    optionContainer: {
      alignItems: 'center',
    },
    header: {
      backgroundColor: color[state.theme].primary,
    },
    divider: {
      backgroundColor: color[state.theme].background,
      height: 0.5,
    },
    listOption: {
      width: '95%',
      flexDirection: 'column',
      justifyContent: 'center',
      borderRadius: 3,
      height: 'auto',
      padding: 25,
      margin: 3,
      backgroundColor: color[state.theme].primary,
      elevation: 12,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Action
          icon={'menu'}
          color={color[state.theme].secondary}
          onPress={() => navigation.toggleDrawer()}
        />
        <Appbar.Content
          color={color[state.theme].secondary}
          title="Configurações"
        />
      </Appbar.Header>
      <View style={styles.optionContainer}>
        <Surface style={styles.listOption}>
          <OptionItem
            text={'Active: '}
            theme={state.theme}
            value={state.backgroundService}
            onValueChange={() => {
              const newValue = !state.backgroundService;
              setSettingsOnDatabase({ ...state, backgroundService: newValue });
              dispatch({
                type: 'toggleService',
                backgroundService: newValue,
              });
            }}
          />
          <Divider style={styles.divider} />
          <OptionItem
            text={'Dark Mode: '}
            theme={state.theme}
            value={state.theme === 'dark'}
            onValueChange={async () => {
              const newValue = state.theme === 'light' ? 'dark' : 'light';
              await setSettingsOnDatabase({ ...state, theme: newValue });
              dispatch({
                type: 'switchTheme',
                theme: newValue,
              });
            }}
          />
        </Surface>
      </View>
    </SafeAreaView>
  );
};

export default SettingsContainer;
