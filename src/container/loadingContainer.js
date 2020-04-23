import React, { useEffect } from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import Loader from 'src/components/Loader';

import color from 'src/assets/jss/colors';

const LoadingContainer = ({ navigation }) => {
  const theme = useSelector(state => state.theme);
  const loading = useSelector(({ loading }) => loading);

  useEffect(() => {
    if (theme || !loading) {
      setTimeout(() => {
        navigation.navigate('Dashboard');
      }, 3000);
    }
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: color[theme].primary,
    },

    logo: {},
    blankArea: {
      height: '30%',
    },
    logoArea: {
      height: '40%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    loaderArea: {
      height: '30%',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.blankArea} />
      <View style={styles.logoArea}>
        <Loader size={'large'} color={color.primary} />
      </View>
      <View style={styles.loaderArea}>
        <Loader size={'large'} color={color.primary} />
      </View>
    </SafeAreaView>
  );
};

export default LoadingContainer;
