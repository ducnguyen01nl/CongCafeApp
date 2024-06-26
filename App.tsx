/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { Provider } from 'react-redux';
import { store } from './src/app/redux/store';
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './src/root/RootNavigation';
import ToastService from './src/service/ToastService';
import RootScreen from './src/root/RootScreen';
import ToastMessage from './src/components/ToastMessage';
import { getTokenOAuth, notificationListener, requestUserPermission, useToken } from './src/utils/notification';
import { linking } from './src/root/PressNotification/linking';
import CodePush from 'react-native-code-push'

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  useEffect(() =>{
    requestUserPermission()
    useToken()
    // getTokenOAuth()
    // notificationListener()
  },[])

  return (
    
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer ref={navigationRef} linking={linking}>
          <RootScreen />
          <ToastMessage ref={ToastService.ref} />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default CodePush(App);
