import React from 'react'
import { Text, ScrollView, TouchableOpacity, Dimensions, KeyboardAvoidingView } from 'react-native'
import firebase from 'react-native-firebase'
import { Container, Header, Footer, Content, Item, Input, View, Fab, Button, Icon, Left, Body, Title, Right, List, ListItem, Thumbnail, } from 'native-base';
import { connect } from 'react-redux'
import { sendMessage, getMessageOfSelectedGroup } from '../action'


const successImageUri = 'https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659652_960_720.png';
const successImageUri1 = 'https://www.accueilanvers.org/wp-content/uploads/2018/04/1iydnsu7s91d9zwrnmqh.png.resize.710x399.png';


const { height, width, fontScale } = Dimensions.get("window")


class Chats extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            textMsg: ''
        }
    }
    // componentWillReceiveProps(props){
    // //    props.messages.length &&
    //     console.log("comp",props.messages)
    // }
    // componentWillMount(){
    //     const SeletcedGroup = this.props.SeletcedGroup
    //     const seletcedGroupKey = SeletcedGroup.key
    //     firebase.database().ref(`messages/${seletcedGroupKey}`).on('value', snap => {
    //         // console.log("getMasges", snap.val())
    //         Messages = snap.val()
    //         console.log("componentDidMount", Messages)
    //         // console.log("Messages", Messages)
    //         // dispatch({
    //         //     type: "SELECTED_GROUPMESSAGE",
    //         //     groupMessages: Messages
    //         // })
    //     })
    //     // this.props.getMessageOfSelectedGroup(seletcedGroupKey)
    // }
    handleSend = () => {
        // console.log("clicked Send")
        // console.log(this.state.textMsg)
        const { textMsg } = this.state
        let groupKey = this.props.SeletcedGroup.key
        this.props.sendMessage(textMsg, groupKey)
        this.setState({
            textMsg: ''
        })
    }
    // signOut = () => {
    //     firebase.auth().signOut().then(() => {
    //         this.props.navigation.navigate("Authnumber")
    //     });
    // }
    render() {
        const { textMsg } = this.state
        const SeletcedGroup = this.props.SeletcedGroup

        // console.log("MM",this.props.messages)
        // const seletcedGroupKey = SeletcedGroup.key
        // this.props.getMessageOfSelectedGroup(seletcedGroupKey)
        return (
            <View  >
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.tabRef.goToPage(0)} >
                            <Icon name='ios-arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>{SeletcedGroup.groupName}</Title>
                    </Body>
                    <Right>
                        {/* <TouchableOpacity onPress={this.signOut}>
                            <Text style={{ color: "white" }} >Sign out</Text>
                        </TouchableOpacity> */}
                    </Right>
                </Header>
                <View style={{ height: height / 1.4 }} >
                    <ScrollView  >
                        <List>
                            {
                                this.props.messages.reverse().map((mList, index) => {
                                    return (
                                        <ListItem key={index}>
                                            <TouchableOpacity style={{ flexDirection: "row" }}>
                                                {/* <Left>
                                                    <Thumbnail source={{ uri: successImageUri }} />
                                                </Left> */}
                                                <Body>
                                                    <Text style={{color: 'green'}} >{mList.userName}</Text>
                                                    <Text note>{mList.textMsg}. .</Text>
                                                </Body>
                                                <Right>
                                                    <Text note>3:43 pm</Text>
                                                </Right>
                                            </TouchableOpacity>
                                        </ListItem>
                                    )
                                    // console.log("map", tt)
                                })
                                // console.log("111",this.props.messages)
                            }

                        </List>
                    </ScrollView>
                </View>
                {/* <KeyboardAvoidingView  behavior="padding"> */}
                <View style={{
                    borderRadius: 30,
                    width: '100%',
                    height: 55,
                    backgroundColor: 'white',
                    justifyContent: 'center',
                    alignItems: 'center',
                    // position: 'absolute',
                    bottom: 0
                }}  >
                    <Item rounded  >
                        <Input placeholder='Type a message'
                            onChangeText={value => this.setState({ textMsg: value })}
                            value={textMsg} />
                        <TouchableOpacity onPress={this.handleSend} >
                            <Icon active name='md-send' />
                        </TouchableOpacity>
                    </Item>
                </View>
                {/* </KeyboardAvoidingView> */}
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    console.log("???mapStateToPropsChat", state)
    return {
        // User: state.User,
        // userdetail: state.userDetail.userdetail
        SeletcedGroup: state.groups.SeletcedGroup,
        messages: state.groups.Messages,
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: (textMsg, groupKey) => dispatch(sendMessage(textMsg, groupKey)),
        getMessageOfSelectedGroup: (seletcedGroupKey) => dispatch(getMessageOfSelectedGroup(seletcedGroupKey))
        // getSeletcedGroup: (list) => dispatch(getSeletcedGroup(list))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Chats)
