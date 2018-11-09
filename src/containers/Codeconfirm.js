import React, { Component } from 'react';
import { View, Button, Text, TextInput, Image, Dimensions, ScrollView } from 'react-native';
import { connect } from 'react-redux'
import { Confirmcode, logUser } from '../store/action'


const { height, width, fontScale } = Dimensions.get("window")


// import firebase from 'react-native-firebase';

class VerificationCode extends Component {
    constructor(props) {
        super(props);
        this.unsubscribe = null;
        this.state = {
            // user: null,
            // message: '',
            codeInput: '',
            // phoneNumber: '+92',
            confirmResult: null,
        };
    }
    componentWillReceiveProps(nextProps) {
        // console.log("QQQ", nextProps)   
        let currentUser = nextProps.logedUser
        
        if(currentUser === "Not User") {
            return
        } else if (currentUser === false) {
            
            this.props.navigation.replace("UserDetail")
        } else if (currentUser) {
            this.props.navigation.replace("Dashboard")
        }

    }
    componentDidMount() {
        this.props.logUser()
    }

    confirmCode = () => {
        const { codeInput } = this.state;
        const confirm = this.props.confirm;
        this.props.Confirmcode(codeInput, confirm)
    };

    render() {
        const { codeInput } = this.state;
        return (
            <View style={{ marginTop: 25, padding: 25, height: height }}>
                <Text>Enter verification code below:</Text>
                <TextInput
                    autoFocus
                    style={{ height: 40, marginTop: 15, marginBottom: 15 }}
                    onChangeText={value => this.setState({ codeInput: value })}
                    placeholder={'Code ... '}
                    value={codeInput}
                />
                <Button title="Confirm Code" color="#841584" onPress={this.confirmCode} />
            </View>
        );
    }
}
const mapStateToProps = (state) => {

    return {
        logedUser: state.Signin.logUser,
        confirm: state.Signin.confirm && state.Signin.confirm,
        // User: state.User.user
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        Confirmcode: (code, confirm) => { dispatch(Confirmcode(code, confirm)) },
        logUser: () => { dispatch(logUser()) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(VerificationCode)
