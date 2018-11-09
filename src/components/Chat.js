import React from 'react'
import { Text, ScrollView, TouchableOpacity, Dimensions, Modal, TouchableHighlight, KeyboardAvoidingView } from 'react-native'
import firebase, { database } from 'react-native-firebase'
import {
    Container, Header, Footer, Content, Item, Input, View, Fab, Button, Card, Icon, Left,
    Body, Title, Right, List, ListItem, Thumbnail, CardItem
} from 'native-base';
import moment from 'moment';

import { connect } from 'react-redux'
import { allMessage, allMessagesForSuperAdmin } from '../store/action'

const imgurl = 'https://firebasestorage.googleapis.com/v0/b/chatapp-25815.appspot.com/o/images%2FdummyGroupIcon.png?alt=media&token=e96ec4ca-6b23-4611-a2a4-3aecc43c9e21'

const { height, width, fontScale } = Dimensions.get("window")
class Chats extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            textMsg: '',
            messageList: [],
            selectedMsg: '',
            msgModalVisible: false,
            searchMsg: '',
            orignalallMessagesForSA: [],
            showallMessagesForSA: [],
            orignalUserAllMessages: [],
            showUserAllMessages: []
        }
    }
    handleSearch = (value) => {
        var { orignalallMessagesForSA, orignalUserAllMessages } = this.state

        // let dataFilter =  orignalallMessagesForSA.filter((a) =>  a.groupName.slice(0, value.length) ===  value)
        let dataFilter = orignalallMessagesForSA.filter((a) => (a.textMsg.toLowerCase().includes(value.toLowerCase())) || (a.groupName.toLowerCase().includes(value.toLowerCase())))

        this.setState({
            showallMessagesForSA: dataFilter
        })

        let dataFilterforUser = orignalUserAllMessages.filter((a) => (a.textMsg.toLowerCase().includes(value.toLowerCase())) || (a.groupName.toLowerCase().includes(value.toLowerCase())))

        // let dataFilterforUser = orignalUserAllMessages.filter((a) => (a.textMsg.slice(0, value.length) === value) ||(a.groupName.slice(0, value.length)===value))
        this.setState({
            showUserAllMessages: dataFilterforUser
        })
    }

    componentDidMount() {
        const { userKey } = this.props.logUser
        this.props.allMessage(userKey)
        this.props.allMessagesForSuperAdmin()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.allMessagesForSA) {
            this.setState({
                orignalallMessagesForSA: nextProps.allMessagesForSA,
                showallMessagesForSA: nextProps.allMessagesForSA
            })
        }
        if (nextProps.allMessages) {
            this.setState({
                orignalUserAllMessages: nextProps.allMessages,
                showUserAllMessages: nextProps.allMessages
            })
        }
    }

    handleMsgModel(selected) {
        this.setState({ msgModalVisible: true, selectedMsg: selected })
    }
    handleClose = () => {
        this.setState({
            msgModalVisible: false
        })
    }
    render() {
        const { msgModalVisible, selectedMsg, showallMessagesForSA, showUserAllMessages } = this.state
        const user = this.props.logUser && this.props.logUser.user



        var selMsgTime = moment(selectedMsg.msgTime).format('LT');
        var selMsgDate = moment(selectedMsg.msgTime).format('ll');

        let date = new Date(selectedMsg.msgTime);
        let MDY = date.toDateString()
        let MDY1 = MDY.split(' ')
        let dd = MDY1.shift();
        let hh = date.getHours();
        let mm = date.getMinutes();
        var amPM = (hh > 11) ? "PM" : "AM";
        if (hh > 12) {
            hh -= 12;
        } else if (hh == 0) {
            hh = "12";
        }
        if (mm < 10) {
            mm = "0" + mm;
        }
        let msgDate = MDY1 + ' '
        let selectedMsgtime = hh + ":" + mm + " " + amPM;


        return (
            <View style={{ backgroundColor: '#E5E5E5' }} >
                <Header style={{ backgroundColor: "#66CCFF" }} >
                    <Left  style={{maxWidth:45}}>
                        <Button transparent>
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body  >
                        <Title >Masseges</Title>

                    </Body>
                </Header>
                <View style={{ height: height / 1.25 }} >
                    <View style={{paddingTop: 5, paddingBottom:5, }} >
                        <Item style={{ width: '100%', height: 40, backgroundColor: "white"  }} rounded >
                            <Input placeholder="Messages"
                                onChangeText={value => this.handleSearch(value)}
                            />
                            {/* <TouchableOpacity onPress={this.handleSearch}> */}
                            <Icon style={{ color: 'gray' }} name="ios-search" />
                            {/* </TouchableOpacity> */}
                        </Item>
                    </View>
                    <ScrollView  >
                        <List>
                            {
                                user === 'superUser' ?
                                    showallMessagesForSA && showallMessagesForSA.map((Msg, index) => {

                                        var msgTime = moment(Msg.msgTime).format('LT');
                                        var msgDate = moment(Msg.msgTime).format('ll');
                                
                                        return (
                                        <ListItem key={index} style={{ marginLeft: 15, marginRight: 15, paddingLeft: 10, paddingRight: 10, borderRadius:5, marginBottom: 5, backgroundColor: "white" }} >
                                                <TouchableOpacity onPress={() => this.handleMsgModel(Msg)} style={{ flexDirection: "row" }}>
                                                    <Body style={{ maxWidth: 150 }} >
                                                        <Text style={{ color: 'green' }} >{Msg.userName}</Text>
                                                        <Text numberOfLines={1} note>{Msg.textMsg}...</Text>
                                                        <View style={{ flexDirection: 'row' }}>
                                                        </View>
                                                    </Body>
                                                    <Right style={{ width: 50 }}>
                                                        <Text style={{ color: 'green' }}>{Msg.groupName}</Text>
                                                        <Text note>{msgDate}</Text>
                                                        <Text note>{msgTime}</Text>
                                                    </Right>
                                                </TouchableOpacity>
                                            </ListItem>
                                        )
                                    })
                                    :
                                    showUserAllMessages && showUserAllMessages.map((Msg, index) => {
                                        // let MDY = date1.toDateString(Msg.msgTime)

                                        var msgTime = moment(Msg.msgTime).format('LT');
                                        var msgDate = moment(Msg.msgTime).format('ll');
                                
                                        return (
                                        <ListItem key={index} style={{ marginLeft: 15, marginRight: 15, paddingLeft: 10, paddingRight: 10, borderRadius:5, marginBottom: 5, backgroundColor: "white" }} >
                                                <TouchableOpacity onPress={() => this.handleMsgModel(Msg)} style={{ flexDirection: "row" }}>
                                                    {/* <Left>
                                                    <Thumbnail source={{ uri: successImageUri }} />
                                                </Left> */}
                                                    <Body style={{ maxWidth: 150 }} >
                                                        {/* <Text style={{ color: 'green' }} >{Msg.userName}</Text> */}
                                                        <Text style={{ color: 'green' }}>{Msg.groupName}</Text>
                                                        <Text numberOfLines={1} note>{Msg.textMsg}...</Text>
                                                    </Body>
                                                    <Right>
                                                        <Text note>{msgDate}</Text>
                                                        <Text note>{msgTime}</Text>
                                                    </Right>
                                                </TouchableOpacity>
                                            </ListItem>
                                        )
                                    })
                            }
                        </List>
                    </ScrollView>
                </View>
                <Modal
                    animationType='fade' transparent visible={msgModalVisible}
                    onRequestClose={() => this.setState({ msgModalVisible: false })}
                >
                    <View style={{ width: width, height: height, backgroundColor: 'rgba(0, 0, 0, 0.7)' }} >
                        <Card style={{ flex: 0, marginTop: 100, marginLeft: 20, marginRight: 20, justifyContent: 'center', alignItems: 'center', }}>

                            {/* <CardItem style={{ width: width / 1.2, flexDirection: "row", justifyContent: "space-between" }} >
                            <Left>
                                <View></View>
                                <TouchableHighlight onPress={this.handleClose} >
                                    <Text>
                                        <Icon name="close" />
                                    </Text>
                                </TouchableHighlight>
                            </Left>
                        </CardItem> */}
                            <CardItem style={{ borderBottomWidth: 1, borderBottomColor: "#C6C6C6" }} >
                                <Left>
                                    <Thumbnail square source={{ uri: selectedMsg.groupImageUrl }} />
                                    <Body>
                                        <Text>{selectedMsg.groupName}</Text>
                                        <Text note>{selMsgDate}</Text>
                                        <Text note>{selMsgTime}</Text>
                                    </Body>
                                </Left>
                                <Right>
                                    <TouchableHighlight onPress={this.handleClose} >
                                        <Text >
                                            <Icon style={{ color: '#4B4B4C', fontSize: 30 }} name="close" />
                                        </Text>
                                    </TouchableHighlight>
                                </Right>
                            </CardItem>
                            <CardItem>
                                <Body>
                                    {/* <Image source={{ uri: 'Image URL' }} style={{ height: 200, width: 200, flex: 1 }} /> */}
                                    <Text>
                                        {selectedMsg.textMsg}
                                    </Text>
                                </Body>
                            </CardItem>
                            {/* <View>
                                <Text style={{ padding: 10 }} >Massges</Text>
                            </View> */}
                        </Card>
                    </View>
                </Modal>
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        logUser: state.Signin.logUser,
        allMessages: state.allMessage.allMessages,
        allMessagesForSA: state.allMessage.allMessagesSuperAdmin
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        allMessage: (userKey) => dispatch(allMessage(userKey)),
        allMessagesForSuperAdmin: () => dispatch(allMessagesForSuperAdmin())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Chats)
