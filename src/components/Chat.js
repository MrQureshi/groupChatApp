import React from 'react'
import { Text, ScrollView, TouchableOpacity, Dimensions, Modal, TouchableHighlight, KeyboardAvoidingView } from 'react-native'
import firebase, { database } from 'react-native-firebase'
import { Container, Header, Footer, Content, Item, Input, View, Fab, Button, Card, Icon, Left, Body, Title, Right, List, ListItem, Thumbnail, } from 'native-base';
import { connect } from 'react-redux'
import { sendMessage, allMessage } from '../action'

const successImageUri = 'https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659652_960_720.png';
const successImageUri1 = 'https://www.accueilanvers.org/wp-content/uploads/2018/04/1iydnsu7s91d9zwrnmqh.png.resize.710x399.png';


const { height, width, fontScale } = Dimensions.get("window")


class Chats extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            textMsg: '',
            modalVisible: false,
            messageList: []
        }
    }
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    componentDidMount() {
        const { userKey } = this.props.logUser
        this.props.allMessage(userKey)
    }

    // componentDidUpdate() {


    // }
    componentWillReceiveProps(nextProps) {
        if (nextProps.messages) {
            let msg = nextProps.messages

            msg.sort((a, b) => a.msgTime - b.msgTime)

            this.setState({
                messageList: msg
            })
        }


    }
    // componentWillMount(){
    //     const SelectedGroup = this.props.SelectedGroup
    //     const SelectedGroupKey = SelectedGroup.key
    //     firebase.database().ref(`messages/${selectedGroupKey}`).on('value', snap => {
    //         Messages = snap.val()
    //         // dispatch({
    //         //     type: "SELECTED_GROUPMESSAGE",
    //         //     groupMessages: Messages
    //         // })
    //     })
    //     // this.props.getMessageOfSelectedGroup(selectedGroupKey)
    // }
    handleSend = () => {
        const { textMsg, modalVisible } = this.state
        let groupKey = this.props.SelectedGroup.key
        let groupName = this.props.SelectedGroup.groupName
        let date = new Date();
        let msgTime = date.getTime()

        this.props.sendMessage(textMsg, groupKey, groupName, msgTime)
        this.setState({
            textMsg: ''
        })
    }

    handleCheckGroupAdmin = () => {
        const SelectedGroup = this.props.SelectedGroup

        if (SelectedGroup) {
            const { userKey } = this.props.logUser
            const member = SelectedGroup.member
            for (let key in member) {
                let Member = []
                Member.push({ ...member[key], key })
                for (let key in Member) {
                    if (Member[key].key === userKey && Member[key].Admin) {
                        return true
                    } else {
                        return false
                    }
                }
            }
        }
    }


    render() {
        const { textMsg, modalVisible, messageList } = this.state
        const SelectedGroup = this.props.SelectedGroup
        const user = this.props.logUser && this.props.logUser.user

        return (
            <View >
                <Header>
                    <Left>
                        <Button transparent>
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body>
                        {
                            SelectedGroup
                                ?
                                <Title>{SelectedGroup.groupName}</Title>
                                :
                                <Title>Chats</Title>
                        }
                    </Body>
                    <Right>
                        {
                        user === "superUser" || this.handleCheckGroupAdmin() ? 
                        

                                <TouchableOpacity
                                    // onPress={() => this.props.tabRef.goToPage(1)}
                                    onPress={() => this.setState({ modalVisible: true, })}
                                >
                                    {/* <Icon name='ios-arrow-forward' /> */}
                                    <Icon style={{ color: 'white', paddingRight: 20 }} name='md-more' />
                                </TouchableOpacity>
                                : null
                        }
                    </Right>
                </Header>
                <View style={{ height: height / 1.4 }} >
                    <ScrollView  >
                        <List>
                            {
                                SelectedGroup
                                    ?
                                    messageList.map((mList, index) => {
                                        let date = new Date(mList.msgTime);
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
                                                        <Text style={{ color: 'green' }} >{mList.userName}</Text>
                                                        <Text note>{mList.textMsg}. .</Text>
                                                    </Body>
                                                    <Right>
                                                        {/* <Text style={{ color: 'green' }}>{mList.groupName}</Text> */}
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

                {
                    SelectedGroup ?
                        user === "superUser" ?
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
                            : null
                        : null
                }

                {
                    SelectedGroup ?
                        this.handleCheckGroupAdmin()
                            ?
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
                            : null
                        : null
                }

                <Modal
                    animationType='none'
                    // transparent={false}


                    transparent={true}
                    visible={modalVisible}

                    onRequestClose={() => this.setState({ modalVisible: false })}
                // style={{ width:50,  position:"absolute", Top:0, Right: 0, }}
                >
                    <View style={{
                        flex: 1,
                        // flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: "absolute", top: 20, right: 35
                    }}>
                        <Card>
                            <View style={{

                                width: 120,
                                // height: 80
                            }}>
                                <TouchableOpacity onPress={() => {
                                    this.setState({ modalVisible: false }, () => {
                                        this.props.navigation.navigate('Members')
                                    })
                                }}>
                                    <Text style={{ padding: 10 }} >Members</Text>
                                </TouchableOpacity>

                                {/* <TouchableHighlight
                                    onPress={() => {
                                        this.setModalVisible(!modalVisible);
                                    }}>
                                    <Text>
                                        <Icon name="close" />
                                    </Text>
                                </TouchableHighlight> */}
                            </View>
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
        // userdetail: state.userDetail.userdetail
        SelectedGroup: state.groups.SelectedGroup,
        messages: state.groups.Messages,
        allMessages: state.allMessage.allMessages
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: (textMsg, groupKey, groupName, msgTime) => dispatch(sendMessage(textMsg, groupKey, groupName, msgTime)),
        // getMessageOfSelectedGroup: (SelectedGroupKey) => dispatch(getMessageOfSelectedGroup(selectedGroupKey)),
        allMessage: (userKey) => dispatch(allMessage(userKey))
        // getSelectedGroup: (list) => dispatch(getSelectedGroup(list))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Chats)
