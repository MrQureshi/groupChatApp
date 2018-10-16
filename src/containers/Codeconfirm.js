import React, { Component } from 'react';
import { View, Button, Text, TextInput, Image, Dimensions, ScrollView } from 'react-native';
import { connect } from 'react-redux'
import { Confirmcode } from '../action'


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

        console.log("nextProps in CodeConfirm", nextProps)
        let userKey = nextProps && nextProps.User && nextProps.User.uid
        // console.log("uid,", userKey)
        if (userKey) {
        this.props.navigation.navigate('UserDetail')            
        }
    }

    confirmCode = () => {
        const { codeInput } = this.state;
        const confirm = this.props.confirm;
        // console.log(confirm)
        this.props.Confirmcode(codeInput, confirm)


        // this.props.navigation.navigate('UserDetail')


        // confirm.confirm(codeInput).then((res)=>{
        //     console.log("user authticated", res)
        //     if(res){
        //         this.props.navigation.navigate('UserDetail')
        //     }
        // }).catch((error)=>{
        //     console.log(error)
        // })
    };

    render() {
        const { codeInput } = this.state;
        console.log("render confirm", this.props.User)
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
    console.log("mapStateToProps", state)
    return {
        confirm: state.Signin.confirm && state.Signin.confirm,
        User: state.User.user
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        Confirmcode: (code, confirm) => {
            dispatch(Confirmcode(code, confirm))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(VerificationCode)
