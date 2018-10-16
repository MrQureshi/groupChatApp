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

        console.log("nextProps in userDet", nextProps)
        let userKey = nextProps && nextProps.userdetail && nextProps.userdetail.userKey
        // console.log("uid,", userKey)
        if (userKey) {
            this.props.navigation.navigate("Dashboard")
        }
    }
    // componentDidMount() {
    //     firebase.auth().onAuthStateChanged((user) => {
    //         if (user) {
    // console.log(user.uid)


    // firebase.database().ref(`user/${user.uid}`).on('value', snap => {
    //     console.log("aaaaaaaaaaa")
    //     let objuser = snap.val();
    //     // console.log("user.uid", user.uid)
    //     // console.log("key", objuser.userKey)

    //     if (user.uid === objuser.userKey) {
    //         this.props.navigation.navigate("Groups")
    //     }
    // })
    // this.props.navigation.navigate("Groups")

    // this.setState({
    //     user
    // })
    // this.props.navigation.navigate("Home")
    //         }
    //     });
    // }

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
        // console.log("renderr", this.props.userdetail)
        // this.props.navigation.navigate("Groups")
        return (
            // <View>
            //     <Text>userInput</Text>
            //     <Button title="Sign Out" color="red" onPress={this.signOut} />
            // </View>


            // <ScrollView>
            <Container style={{
                padding: 30,
                paddingTop: 60
            }}  >
                {/* <Header /> */}
                <Content  >
                    {/* <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                        <Text style={{ fontSize: 30 }}  >User Details</Text>
                    </View> */}
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
                        <Button title="submit" color="green" onPress={this.handleSubmit} />
                    </Form>
                </Content>
            </Container>

            // </ScrollView>
        )
    }
}
const mapStateToProps = (state) => {
    // console.log("mapStateToProps>??", state)
    return {
        User: state.User,
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