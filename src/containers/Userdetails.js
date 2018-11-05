import React from 'react'
import { View, Button, Text, TextInput, Image, Dimensions, ScrollView } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label } from 'native-base';
import firebase from 'react-native-firebase'
import { userDetail } from '../action'
import { connect } from 'react-redux'

const successImageUri = 'http://invagesystems.com/home/wp-content/uploads/2018/03/dummyprofilepic.png';

class UserDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: '',
            rollNum: '',
        }
    }
    componentWillReceiveProps(nextProps) {
        console.log("nextPProp userDetail", nextProps.logedUser)
        let currentUser = nextProps.logedUser

        if (currentUser) {
            this.props.navigation.replace("Dashboard")
        }
    }

    handleSubmit = () => {
        const { userName, rollNum } = this.state
        let userKey = firebase.auth().currentUser._user.uid;
        let phoneNumber = firebase.auth().currentUser._user.phoneNumber
        this.props.userDetail(userKey, phoneNumber, userName, rollNum)
    }
    // signOut = () => {
    //     firebase.auth().signOut().then(()=>{
    //         this.props.navigation.navigate("Authnumber")
    //     });
    // }
    render() {
        const { userName, rollNum } = this.state
        const IsValid = userName === '' || rollNum === ''; 
        return (

            <Container style={{
                padding: 30,
                paddingTop: 60
            }}  >
                <Content >
                    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, }} >
                        <Image source={{ uri: successImageUri }} style={{ width: 100, height: 100, marginBottom: 25 }} />
                    </View>
                    <Form>
                        <Item fixedLabel>
                            <Label>Username</Label>
                            <Input
                                // autoFocus
                                onChangeText={value => this.setState({ userName: value })}
                                value={userName}
                            />
                        </Item>
                        <Item fixedLabel last>
                            <Label>Roll Num</Label>
                            <Input
                                onChangeText={value => this.setState({ rollNum: value })}
                                value={rollNum}
                            />
                        </Item>
                        <Button title="submit" disabled={IsValid} color="#66CCFF" onPress={this.handleSubmit} />

                    </Form>
                </Content>
            </Container>
        )
    }
}
const mapStateToProps = (state) => {
    console.log("state UserDetal", state)
    return {
        logedUser: state.Signin.logUser,

        userdetail: state.userDetail.userdetail
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        userDetail: (userKey, phoneNumber, userName, rollNum) => {
            dispatch(userDetail(userKey, phoneNumber, userName, rollNum))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserDetails)