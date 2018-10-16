import React, { Component } from 'react';
import { View, Button, Text, TextInput, Image, Dimensions, ScrollView } from 'react-native';
import { connect } from 'react-redux'


const { height, width, fontScale } = Dimensions.get("window")
import { Signin } from '../action'

import firebase from 'react-native-firebase';

class Authnumber extends Component {
    constructor(props) {
        super(props);
        this.unsubscribe = null;
        this.state = {
            phoneNumber: '+92',
        };
    }
    componentWillMount(){
        // firebase.auth().signOut();
        firebase.auth().onAuthStateChanged(user=>{
            if(user){
                firebase.database().ref(`user/${user.uid}/`).on('value', snap => {
                    if(snap.val()){
                        // alert("Sign in")
                        this.props.navigation.navigate("Dashboard")
                    }
                    else{
                        alert("Not Sign")
                        this.props.navigation.navigate("UserDetail")
                    }
                })
            }
        })
    }
    signIn = () => {

        const { phoneNumber } = this.state;

        this.props.Signin(phoneNumber)

        this.props.navigation.navigate('ConfirmCode');

    };
    render() {
        const { phoneNumber } = this.state
        // const confirm = this.props.confirm
        // console.log("ender", confirm)
        return (
            <View style={{ padding: 25, height: height, backgroundColor: "#E2DEDB" }}>
                <Text>Enter phone number:</Text>
                <TextInput
                    autoFocus
                    style={{ height: 40, marginTop: 15, marginBottom: 15 }}
                    onChangeText={value => this.setState({ phoneNumber: value })}
                    placeholder={'Phone number ... '}
                    value={phoneNumber}
                />
                <Button title="Sign In" color="green" onPress={this.signIn} />
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    // console.log(state)
    return {
        confirm:state.Signin.confirm && state.Signin.confirm
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        Signin: (src) => {
            dispatch(Signin(src))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Authnumber)
