import React, { Component } from 'react';
import { View, Button, Text, TextInput, TouchableOpacity, Image, Dimensions,ActivityIndicator, ScrollView } from 'react-native';
import { connect } from 'react-redux'
import PhoneInput from 'react-native-phone-input'

const { height, width, fontScale } = Dimensions.get("window")
import { Signin } from '../action'

// import firebase from 'react-native-firebase';

class Authnumber extends Component {
    constructor(props) {
        super(props);

        this.state = {
            valid: false,
            phoneNumber: "",
            getError: '',
            showMe: true
        };
    }
    componentDidUpdate() {
        let currentUser = this.props.logUser
        
        if (currentUser) {
            // alert("Dashboard")
            // this.setState({
            //     showMe: false
            // })
            this.props.navigation.replace("Dashboard")
        } else if (currentUser === false) {
            this.props.navigation.replace("UserDetail")
        }
    }

    signIn = () => {
        if (this.state.valid) {

            const { phoneNumber } = this.state;

            this.props.Signin(phoneNumber)

            this.props.navigation.navigate("ConfirmCode");
        } else {
            this.setState({
                getError: "Not valid"
            })
        }

    };

    render() {
        const { phoneNumber } = this.state
        return (
            // <View>
            //     
            // </View>
            <View style={{ padding: 25, height: height, }}>
                <Text>Enter phone number:</Text>
                <PhoneInput
                    style={{ marginBottom: 20, marginTop: 10, backgroundColor: "#e4e4e4", height: 25 }}
                    ref={ref => {
                        this.phone = ref;
                    }}
                    onChangePhoneNumber={() => this.setState({
                        valid: this.phone.isValidNumber(),
                        phoneNumber: this.phone.getValue()
                    })}
                    initialCountry="pk"
                />
                <Button title="Sign In" color="#66CCFF" onPress={this.signIn}
                />
                <Text style={{ textAlign: "center", color: "red" }} >
                    {this.state.getError}
                </Text>
                {/* {
                    this.state.showMe ? <ActivityIndicator size='large' color='green'/> : null
                } */}
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
