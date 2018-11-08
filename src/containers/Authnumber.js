import React, { Component } from 'react';
import { View, Button, Text, TextInput, TouchableOpacity, Image, Dimensions, ActivityIndicator, Modal, ScrollView } from 'react-native';
import { connect } from 'react-redux'
import PhoneInput from 'react-native-phone-input'
import PulseLoader from 'react-native-pulse-loader';


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
    componentWillReceiveProps(nextProp) {
        let currentUser = nextProp.logUser

        if (currentUser === "Not User") {
            this.setState({
                showMe: false
            })
        } else if (currentUser === false) {

            this.props.navigation.replace("UserDetail")
        } else if (currentUser) {
            this.props.navigation.replace("Dashboard")
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
        // const { phoneNumber } = this.state
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
                {
                    this.state.showMe ?
                        <Modal visible={this.state.showMe}   >
                            {/* <View style={{ height: height, width: width, backgroundColor: 'rgba(0, 0, 0, 0.5)' }} > */}
                            <PulseLoader backgroundColor={'#66CCFF'} borderColor={'#000080'} size={20}
                                pressDuration={20}
                                // pressInValue={0.4} 
                                pressInValue={500}
                                // avatar={'https://firebasestorage.googleapis.com/v0/b/chatapp-25815.appspot.com/o/images%2FdummyGroupIcon.png?alt=media&token=e96ec4ca-6b23-4611-a2a4-3aecc43c9e21'}
                            />
                            {/* <ActivityIndicator style={{}} size='large' color='green' /> */}
                            {/* </View> */}
                        </Modal>
                        : null
                }
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
