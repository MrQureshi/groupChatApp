import React from 'react'
import { Text, ScrollView, TouchableOpacity, Dimensions, Modal, TouchableHighlight, KeyboardAvoidingView } from 'react-native'
import { Container, Header, Footer, Content, CardItem, Item, Input, View, Fab, Button, Card, Icon, Left, Body, Title, Right, List, ListItem, Thumbnail, } from 'native-base';
import { sendMessage } from '../action'

import { connect } from "react-redux"
const { height, width, fontScale } = Dimensions.get("window")
const imgurl = 'https://firebasestorage.googleapis.com/v0/b/chatapp-25815.appspot.com/o/images%2FdummyGroupIcon.png?alt=media&token=e96ec4ca-6b23-4611-a2a4-3aecc43c9e21'

class Selectedgroup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            textMsg: '',
            SelectedGroup: '',
            modalVisible: false,
            msgModalVisible: false,
            orignalMessageList: [],
            showMessageList: [],
            groupAamin: false,
            selectedMsg: '',
            searchMsg: ''
        }
    }

    handleSearch = (value) => {
        var { orignalMessageList } = this.state

        let dataFilterByMsg = orignalMessageList.filter((a) => a.textMsg.toLowerCase().includes(value.toLowerCase()))

        this.setState({
            showMessageList: dataFilterByMsg
        })
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            SelectedGroup: nextProps.SelectedGroup
        })
        if (nextProps.messages) {
            let msg = nextProps.messages

            msg.sort((a, b) => a.msgTime + b.msgTime)
            this.setState({
                orignalMessageList: msg,
                showMessageList: msg
            })
        }
    }

    handleSend = () => {
        const { textMsg, modalVisible } = this.state
        let groupKey = this.props.SelectedGroup.key
        let groupName = this.props.SelectedGroup.groupName
        // let groupName = this.props.SelectedGroup.groupName
        let imageUrl = this.props.SelectedGroup.imageUrl
        let date = new Date();
        let msgTime = date.getTime()
        this.props.sendMessage(textMsg, groupKey, groupName, msgTime, imageUrl)
        this.setState({
            textMsg: ''
        })
    }
    handleCheckGroupAdmin = () => {
        const SelectedGroup = this.state.SelectedGroup

        if (SelectedGroup) {
            const member = SelectedGroup.member
            let Member = []
            for (let key in member) {
                Member.push({ ...member[key], key })
            }

            for (let i in Member) {

                const { userKey } = this.props.logUser

                if (Member[i].key === userKey && Member[i].Admin) {
                    return true
                    // this.setState({ groupAamin: true})
                }

            }
        }
    }
    handleMsgModel = (mlist) => {
        this.setState({ msgModalVisible: true, selectedMsg: mlist })
    }
    handleClose = () => {
        this.setState({
            msgModalVisible: false
        })
    }
    render() {
        const { showMessageList, SelectedGroup, textMsg, modalVisible, msgModalVisible, selectedMsg } = this.state
        const user = this.props.logUser && this.props.logUser.user

        const InValid = textMsg === '';

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
            <View style={{ backgroundColor: "#E5E5E5" }} >
                <Header style={{ backgroundColor: "#66CCFF" }}>
                    <Left style={{ maxWidth: 45 }}>
                        <Button transparent>
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body >
                        <Title >{SelectedGroup.groupName}</Title>

                    </Body>
                    <Right >
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
                <View style={{ height: height / 1.27 }} >
                    <View style={{ paddingTop: 5, paddingBottom: 5, }} >
                        <Item style={{ width: '100%', height: 40, justifyContent: "flex-end", backgroundColor: "white" }} rounded >
                            <Input placeholder="Search"
                                onChangeText={value => this.handleSearch(value)}
                            />
                            <Icon style={{ color: 'gray' }} name="ios-search" />
                        </Item>
                    </View>

                    <ScrollView >
                        <List>
                            {
                                showMessageList.map((mList, index) => {
                                    let date = new Date(mList.msgTime);
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
                                    let d = MDY1 + ''
                                    let gettime = hh + ":" + mm + " " + amPM;
                                    return (
                                        <ListItem key={index} style={{ marginLeft: 15, marginRight: 15, paddingLeft: 10, paddingRight: 10,  borderRadius:5, marginBottom: 5, backgroundColor: "white" }} >
                                            <TouchableOpacity onPress={() => this.handleMsgModel(mList)} style={{ flexDirection: "row" }}>
                                                {/* <Left>
                                                    <Thumbnail source={{ uri: successImageUri }} />
                                                </Left> */}
                                                <Body style={{ maxWidth: 150 }} >
                                                    {
                                                        user === "superUser" || this.handleCheckGroupAdmin() ?
                                                            <View>
                                                                <Text style={{ color: 'green' }} >{mList.userName}</Text>
                                                                <Text style={{ color: 'green' }} >{mList.rollNumber}</Text>
                                                                <Text numberOfLines={1} note>{mList.textMsg}..</Text>
                                                            </View>
                                                            :
                                                            <Text numberOfLines={1} note>{mList.textMsg}..</Text>

                                                    }
                                                </Body>
                                                <Right>
                                                    {/* <Text style={{ color: 'green' }}>{mList.groupName}</Text> */}
                                                    <Text note>{gettime}</Text>
                                                    <Text note>{d}</Text>
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
                    user === "superUser" || this.handleCheckGroupAdmin() ?
                        <View style={{
                            borderRadius: 30,
                            width: '100%',
                            height: 55,
                            backgroundColor: 'white',
                            justifyContent: 'center',
                            alignItems: 'center',
                            // position: 'absolute',
                            // bottom: 0
                        }}  >
                            <Item rounded  >
                                <Input placeholder='Type a message'
                                    onChangeText={value => this.setState({ textMsg: value })}
                                    value={textMsg} />
                                <TouchableOpacity onPress={this.handleSend} disabled={InValid} >
                                    <Icon active name='md-send' />
                                </TouchableOpacity>
                            </Item>
                        </View>
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


                            </View>
                        </Card>
                    </View>
                </Modal>
                <Modal
                    animationType='none' transparent={true} visible={msgModalVisible}
                    onRequestClose={() => this.setState({ msgModalVisible: false })}>
                    <View style={{ width: width, height: height, backgroundColor: 'rgba(0, 0, 0, 0.7)' }} >

                        <Card style={{ flex: 0, marginTop: 100, marginLeft: 20, marginRight: 20, justifyContent: 'center', alignItems: 'center' }}>

                            {/* <CardItem style={{ justifyContent: "center" }} >
                                <Left>
                                    <TouchableHighlight onPress={this.handleClose}>
                                        <Text>
                                            <Icon name="close" />
                                        </Text>
                                    </TouchableHighlight>
                                </Left>
                            </CardItem> */}
                            <CardItem>
                                <Left>
                                    <Thumbnail square source={{ uri: selectedMsg.groupImageUrl }} />
                                    <Body>
                                        <Text>{selectedMsg.groupName}</Text>
                                        <Text note>{msgDate}</Text>
                                        <Text note>{selectedMsgtime}</Text>
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
        // userdetail: state.userDetail.userdetail
        SelectedGroup: state.groups.SelectedGroup,
        messages: state.groups.Messages,
        // allMessages: state.allMessage.allMessages
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: (textMsg, groupKey, groupName, msgTime, imageUrl) => dispatch(sendMessage(textMsg, groupKey, groupName, msgTime, imageUrl)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Selectedgroup);
// export default Selectedgroup;