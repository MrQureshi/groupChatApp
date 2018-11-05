import React from 'react'
import { Text, ScrollView, TouchableOpacity, Dimensions, Modal, TouchableHighlight, KeyboardAvoidingView } from 'react-native'
import { Container, Header, Footer, Content, Item, Input, View, Fab, Button, Card, Icon, Left, Body, Title, Right, List, ListItem, Thumbnail, } from 'native-base';
import { sendMessage } from '../action'

import { connect } from "react-redux"
const { height, width, fontScale } = Dimensions.get("window")


class Selectedgroup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            textMsg: '',
            SelectedGroup: '',
            modalVisible: false,
            messageList: [],
            groupAamin: false

        }
    }
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }
    componentWillReceiveProps(nextProps) {
        // console.log("111",nextProps.SelectedGroup)
        this.setState({
            SelectedGroup: nextProps.SelectedGroup
        })
        if (nextProps.messages) {
            let msg = nextProps.messages

            msg.sort((a, b) => a.msgTime - b.msgTime)

            this.setState({
                messageList: msg
            })
        }
    }
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
        const SelectedGroup = this.state.SelectedGroup
        // console.log("SSSS", SelectedGroup)

        if (SelectedGroup) {
            const member = SelectedGroup.member
            // console.log("member", member)
            let Member = []
            for (let key in member) {
                Member.push({ ...member[key], key })
            }

            console.log("MArry", Member)
            for (let i in Member) {
                // console.log("memberKeys", Member[i].key)

                const { userKey } = this.props.logUser
                // console.log("currentUser", userKey)

                // console.log("1st", Member[i].key === userKey, Member[i].Admin)
                // console.log("2nd", )
                if (Member[i].key === userKey && Member[i].Admin) {
                    console.log("return True")
                    return true
                    // this.setState({ groupAamin: true})
                }
             
            }
        }
    }

    render() {
        const { messageList, SelectedGroup, textMsg, modalVisible, groupAamin } = this.state
        const user = this.props.logUser && this.props.logUser.user
        // console.log("???", this.handleCheckGroupAdmin())

        return (
            <View>
                <Header style={{ backgroundColor: "#66CCFF" }}>
                    <Left>
                        <Button transparent>
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body>

                        <Title>{SelectedGroup.groupName}</Title>

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
                <View style={{ height: height / 1.27 }} >
                    <ScrollView >
                        <List>
                            {
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
                                <TouchableOpacity onPress={this.handleSend} >
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
    console.log("state in SelectedGroup", state)

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
        sendMessage: (textMsg, groupKey, groupName, msgTime) => dispatch(sendMessage(textMsg, groupKey, groupName, msgTime)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Selectedgroup);
// export default Selectedgroup;