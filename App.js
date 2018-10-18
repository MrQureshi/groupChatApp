import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import Authnumber from './src/containers/Authnumber'
import ConfirmCode from './src/containers/Codeconfirm'
import UserDetail from './src/containers/Userdetails'
import Dashboard from './src/containers/Dashboard'
import ChatTab from './src/components/Chat'
import firebase from 'react-native-firebase'
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
  async componentDidMount() {
    this.checkPermission();
  }

  //1
  async checkPermission() {

    firebase.messaging().hasPermission()
      .then(enabled => {
        if (enabled) {
          // user has permissions
          console.log("permissions granted");
          this.getToken();
        } else {
          // user doesn't have permission
          console.log("permissions request")

          this.requestPermission();
        }
      });
    // const enabled = await firebase.messaging().hasPermission();
    // if (enabled) {

    // } else {
    //   this.requestPermission();
    // }
  }

  //3
  async getToken() {
    try {
      let fcmToken = await AsyncStorage.getItem('fcmToken');
      
      // let fcmToken = await firebase.messaging().getToken();
      console.log("before fcmToken", fcmToken)
      if (!fcmToken) {
        fcmToken = await firebase.messaging().getToken();
        if (fcmToken) {
          // user has a device token
          console.log("after fcmToken", fcmToken)
  
          await AsyncStorage.setItem('fcmToken', fcmToken);
        }
      }
    } catch (error) {
      // Error saving data
      console.log("error", error)
    }
  }

  //2
  async requestPermission() {
    // try {
    //   await firebase.messaging().requestPermission();
    //   // User has authorised
    //   this.getToken();
    // } catch (error) {
    //   // User has rejected permissions
    //   console.log('permission rejected');
    // }

    firebase.messaging().requestPermission()
      .then(() => {
        // User has authorised
        console.log("permissions granted in requestPermission")
        this.getToken();
      })
      .catch(error => {
        // User has rejected permissions  
        console.log('permission rejected');

      });
  }

  render() {

    return (

      <Provider store={store}>
        <AppStackNavigator />
      </Provider>
    );
  }
}
console.disableYellowBox = true

