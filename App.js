import React, { Component } from 'react';
import Authnumber from './src/containers/Authnumber'
import ConfirmCode from './src/containers/Codeconfirm'
import UserDetail from './src/containers/Userdetails'
import Dashboard from './src/containers/Dashboard'
import Admin from './src/components/Admin'
import Groupselected from './src/components/SelectedGroups'
import Allrequest from './src/components/AllRequests'
import Members from './src/components/Members'
import store from './src/store'
import { Provider } from 'react-redux'
import { logUser } from './src/store/action'

import { createStackNavigator } from 'react-navigation';

const AppStackNavigator = createStackNavigator({
  Authnumber: Authnumber,
  ConfirmCode: ConfirmCode,
  UserDetail: UserDetail,
  Dashboard: Dashboard,
  Admin: Admin,
  Members:Members,
  Groupselected: Groupselected,
  Allrequest:Allrequest
}, { headerMode: "none" })

class App extends Component {

  componentDidMount() {
    store.dispatch(logUser());
    
  }
  
  render() {
    return (

      <Provider store={store}>
        <AppStackNavigator />
      </Provider>
    );
  }
}
// const mapDispatchToProps = (dispatch) => {
//   return {
//     CheckUser: () => {
//       dispatch(CheckUser())
//     }
//   }
// }
export default App
// export default connect(null, mapDispatchToProps)(App)

console.disableYellowBox = true

