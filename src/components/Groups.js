import React from 'react'
import {
    Container, Badge, Header, Modal, Content, View, Fab, Button, Icon, Left, Body, Title, Right,
    List, ListItem, Thumbnail, Item, Input
} from 'native-base';
import { Text, Dimensions, ScrollView, TouchableOpacity, TouchableHighlight } from 'react-native'
import firebase from 'react-native-firebase'
import Create from '../components/createGroup'
import { connect } from 'react-redux'
import { groupList, requestHandle, getSelectedGroup, Requests, deleteGroup } from '../action'
const { height, width, fontScale } = Dimensions.get("window")

// const successImageUri = 'https://muawia.com/wp-content/uploads/2018/07/trace-3157431__340.jpg';

class GroupsDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            orignalGrplist: [],
            showGrplist: []
        }
    }

    handleSearch = (value) => {
        var { orignalGrplist } = this.state


        let dataFilterByGroup = orignalGrplist.filter((a) => a.groupName.toLowerCase().includes(value.toLowerCase()))
        this.setState({
            showGrplist: dataFilterByGroup
        })
    }

    componentDidMount() {
        this.props.groupList();
    }

    selectGroup = (list) => {
        this.props.getSelectedGroup(list)
    }

    componentWillReceiveProps(props) {
        this.setState({
            orignalGrplist: props.GroupList,
            showGrplist: props.GroupList
        })
    }
    handleRequest = (SelectedGroup) => {
        const { key, groupName } = SelectedGroup
        let { userName } = this.props.logUser
        this.props.requestHandle(key, groupName, userName)
    }
    viewRequest = (key) => {
        this.props.Requests(key)
        // this.props.navigation.navigate("Dashboard")
    }
    handleDelete = (groupKey) => {
        this.props.deleteGroup(groupKey)
    }
    render() {
        const { showGrplist } = this.state
        const Currentuser = this.props.logUser.userKey
        const user = this.props.logUser && this.props.logUser.user
        return (
            <View style={{ height: user === 'superUser' ? height - 70 : height, backgroundColor: "#E5E5E5" }} >
                <Header style={{ backgroundColor: "#66CCFF" }} >
                    <Left style={{ maxWidth: 45 }} >
                        <Button transparent>
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body >
                        <Title >Groups</Title>
                    </Body>
                    {/* <Right /> */}
                </Header>
                <View style={{ paddingBottom: 130 }}>
                    <View style={{ paddingTop: 5, paddingBottom: 5, }} >
                        <Item style={{ width: '100%', height: 35, backgroundColor:'white' }} rounded >
                            <Input placeholder="Groups"
                                onChangeText={value => this.handleSearch(value)}
                            />
                            {/* <TouchableOpacity> */}
                            <Icon style={{ color: 'gray' }} name="ios-search" />
                            {/* </TouchableOpacity> */}
                        </Item>
                    </View>
                    <ScrollView>
                        <List>
                            {
                                showGrplist && showGrplist.map((gList, index) => {
                                    let member = gList.member ? Object.keys(gList.member) : []
                                    let arrRequest = gList.Request ? Object.keys(gList.Request) : []
                                    let request = arrRequest.length
                                    return (
                                        user === 'superUser' ?
                                            <ListItem thumbnail key={index} style={{marginLeft:15, marginRight:15,borderRadius:5, paddingLeft:10, paddingRight:10, marginBottom: 5, backgroundColor: "white"}} >
                                                <TouchableOpacity style={{ flexDirection: "row" }}
                                                    // onPress={() => { this.selectGroup(gList); this.props.tabRef.goToPage(0) }}
                                                    onPress={() => { this.selectGroup(gList); this.props.navigation.navigate('Groupselected') }}
                                                >
                                                    <Left>
                                                        <Thumbnail square source={{ uri: gList.imageUrl }} />
                                                    </Left>
                                                    <Body>
                                                        <Text>{gList.groupName}</Text>
                                                        <Text note numberOfLines={1}>{gList.description} ..</Text>
                                                    </Body>
                                                    <Right>
                                                        {
                                                            request
                                                                ?
                                                                <TouchableOpacity onPress={() => { this.viewRequest(gList.key); this.props.navigation.navigate('Admin') }}>
                                                                    <Text style={{ color: 'green' }}  >{request} Request</Text>
                                                                </TouchableOpacity> :
                                                                <Text >No Request</Text>
                                                        }

                                                    </Right>
                                                    <Right style={{ paddingLeft: 20 }} >
                                                        <TouchableOpacity onPress={() => { this.handleDelete(gList.key) }} >
                                                            <Icon name="md-close" style={{ color: "green" }} ></Icon>
                                                        </TouchableOpacity>
                                                    </Right>
                                                </TouchableOpacity>
                                            </ListItem>
                                            :
                                            <ListItem thumbnail key={index} style={{marginLeft:15, marginRight:15, paddingLeft:10, paddingRight:10, borderRadius:10, marginBottom: 5, borderRadius:5, backgroundColor: "white"}} >
                                                <TouchableOpacity disabled={member.indexOf(Currentuser) === -1} style={{ flexDirection: "row" }}
                                                    // onPress={() => {this.selectGroup(gList); this.props.tabRef.goToPage(0)}}
                                                    onPress={() => { this.selectGroup(gList); this.props.navigation.navigate('Groupselected') }}
                                                >
                                                    <Left>
                                                        <Thumbnail square source={{ uri: gList.imageUrl }} />
                                                    </Left>
                                                    <Body>
                                                        <Text>{gList.groupName}</Text>
                                                        <Text note numberOfLines={1}>{gList.description} ..</Text>
                                                    </Body>
                                                    <Right>
                                                        {
                                                            member.indexOf(Currentuser) !== -1 ? <View><Text>View</Text></View> :
                                                                request ?
                                                                    // <TouchableOpacity onPress={() => this.handleRequest(gList)} >
                                                                    <Text>requested</Text>
                                                                    // </TouchableOpacity>
                                                                    :
                                                                    <TouchableOpacity onPress={() => this.handleRequest(gList)} >
                                                                        <Text>Join</Text>
                                                                    </TouchableOpacity>
                                                        }
                                                    </Right>
                                                </TouchableOpacity>
                                            </ListItem>
                                    )
                                })
                            }
                        </List>
                    </ScrollView>
                </View>

                {this.state.showModal && <Create close={() => this.setState({ showModal: false })} />}
                {
                    user === 'superUser'
                        ?
                        <Fab style={{ alignContent: "center", backgroundColor: "#66CCFF", marginTop: 20, position: "absolute" }}
                            position="bottomRight"
                            onPress={() => this.setState({ showModal: true, })}>
                            <Icon name="add" />
                        </Fab>
                        :
                        null
                }
            </View>
            // <View>
            //     <Text>Tab1</Text>
            //     <Button title="Sign Out" color="red" onPress={this.signOut} />
            // </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        logUser: state.Signin.logUser,
        // userdetail: state.userDetail.userdetail
        GroupList: state.groups.groupList,
        SelectedGroup: state.groups.SelectedGroup,
        messages: state.groups.Messages,
        reqList: state.Requests.requests
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        groupList: () => dispatch(groupList()),
        requestHandle: (key, groupName, userName) => dispatch(requestHandle(key, groupName, userName)),
        getSelectedGroup: (list) => dispatch(getSelectedGroup(list)),
        Requests: (key) => dispatch(Requests(key)),
        deleteGroup: (groupKey) => dispatch(deleteGroup(groupKey))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupsDetails)