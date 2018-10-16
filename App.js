import React, { Component } from 'react';
// import { Text, View } from 'react-native';
import Authnumber from './src/containers/Authnumber'
import ConfirmCode from './src/containers/Codeconfirm'
import UserDetail from './src/containers/Userdetails'
import Dashboard from './src/containers/Dashboard'
import ChatTab from './src/components/Chat'

import store from './src/store'
import { Provider } from 'react-redux'

import { createStackNavigator } from 'react-navigation';

const AppStackNavigator = createStackNavigator({
  Authnumber: Authnumber,
  ConfirmCode: ConfirmCode,
  UserDetail: UserDetail,
  Dashboard: Dashboard,
  ChatTab: ChatTab
}, { headerMode: "none" })

export default class App extends Component {

 
  render() {
    return (
      <Provider store={store}>
        <AppStackNavigator />
      </Provider>
    );
  }
}
console.disableYellowBox = true

