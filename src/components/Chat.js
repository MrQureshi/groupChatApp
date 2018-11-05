import React from 'react'
import { Text, ScrollView, TouchableOpacity, Dimensions, Modal, TouchableHighlight, KeyboardAvoidingView } from 'react-native'
import firebase, { database } from 'react-native-firebase'
import { Container, Header, Footer, Content, Item, Input, View, Fab, Button, Card, Icon, Left, Body, Title, Right, List, ListItem, Thumbnail, } from 'native-base';
import { connect } from 'react-redux'
import { allMessage, allMessagesForSuperAdmin } from '../action'

const { height, width, fontScale } = Dimensions.get("window")
class Chats extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            textMsg: '',
            messageList: []
        }
    }
    componentDidMount() {
        const { userKey } = this.props.logUser
        this.props.allMessage(userKey)
        this.props.allMessagesForSuperAdmin()
    }

    render() {
        const user = this.props.logUser && this.props.logUser.user

        return (
            <View >
                <Header style={{ backgroundColor:"#66CCFF"}} >
                    <Left>
                        <Button transparent>
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Masseges</Title>
                    </Body>
                    <Right>

                    </Right>
                </Header>
                <View style={{ height: height / 1.25 }} >
                    <ScrollView  >
                        <List>
                            {
                                user === 'superUser' ?
                                    this.props.allMessagesForSA && this.props.allMessagesForSA.map((Msg, index) => {
                                        let date = new Date(Msg.msgTime);
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
                                        let gettime = hh + ":" + mm + " " + amPM;
                                        return (
                                            <ListItem key={index}>
                                                <TouchableOpacity style={{ flexDirection: "row" }}>
                                                    <Body>
                                                        <Text style={{ color: 'green' }} >{Msg.userName}</Text>
                                                        <Text note>{Msg.textMsg}. .</Text>
                                                    </Body>
                                                    <Right>
                                                        <Text style={{ color: 'green' }}>{Msg.groupName}</Text>
                                                        <Text note>{gettime}</Text>
                                                    </Right>
                                                </TouchableOpacity>
                                            </ListItem>
                                        )
                                    })
                                    :
                                    this.props.allMessages && this.props.allMessages.map((Msg, index) => {
                                        let date = new Date(Msg.msgTime);
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
                                        let gettime = hh + ":" + mm + " " + amPM;
                                        return (
                                            <ListItem key={index}>
                                                <TouchableOpacity style={{ flexDirection: "row" }}>
                                                    {/* <Left>
                                                    <Thumbnail source={{ uri: successImageUri }} />
                                                </Left> */}
                                                    <Body>
                                                        <Text style={{ color: 'green' }} >{Msg.userName}</Text>
                                                        <Text note>{Msg.textMsg}. .</Text>
                                                    </Body>
                                                    <Right>
                                                        <Text style={{ color: 'green' }}>{Msg.groupName}</Text>
                                                        <Text note>{gettime}</Text>
                                                    </Right>
                                                </TouchableOpacity>
                                            </ListItem>
                                        )
                                    })
                            }
                        </List>
                    </ScrollView>
                </View>
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
