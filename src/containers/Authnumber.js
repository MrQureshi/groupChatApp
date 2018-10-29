import React, { Component } from 'react';
import { View, Button, Text, TextInput, Image, Dimensions, ScrollView } from 'react-native';
import { connect } from 'react-redux'


const { height, width, fontScale } = Dimensions.get("window")
import { Signin } from '../action'

// import firebase from 'react-native-firebase';

class Authnumber extends Component {
    constructor(props) {
        super(props);
        this.unsubscribe = null;
        this.state = {
            phoneNumber: '+92',
        };
    }
    // componentWillReceiveProps(nextProps) {

    //     if(nextProps.confirm){
    //         this.props.navigation.navigate('ConfirmCode');
    //     }
    // }
    componentDidUpdate() {

    let currentUser = this.props.logUser
        if (currentUser) {
            // alert("Dashboard")
            this.props.navigation.replace("Dashboard")
        } else if (currentUser === false) {
            this.props.navigation.replace("UserDetail")
        }
    }
    signIn = () => {
        const { phoneNumber } = this.state;

        this.props.Signin(phoneNumber)

        this.props.navigation.navigate("ConfirmCode");
    };
    render() {
        const { phoneNumber } = this.state
        // const confirm = this.props.confirm
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
    return {
        logUser: state.Signin.logUser,
        confirm: state.Signin.confirm && state.Signin.confirm
        
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
