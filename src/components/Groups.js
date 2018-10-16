import React from 'react'
import {
    Container, Header, Modal, Content, View, Fab, Button, Icon, Left, Body, Title, Right,
    List, ListItem, Thumbnail
} from 'native-base';
import { Text, Dimensions, ScrollView, TouchableOpacity, TouchableHighlight } from 'react-native'
import firebase from 'react-native-firebase'
import Create from '../components/createGroup'
import { connect } from 'react-redux'
import { groupList, addMember, getSeletcedGroup } from '../action'
const { height, width, fontScale } = Dimensions.get("window")


// const successImageUri = 'https://muawia.com/wp-content/uploads/2018/07/trace-3157431__340.jpg';

class GroupsDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            selectedGroup: null
        }
    }
    componentDidMount() {
        // firebase.database().ref(`Groups/`).on('value', snap => {
        //     let groupList = [];
        //     // console.log("aaaaaaaaaaa")
        //     let objGroup = snap.val();
        //     // console.log("obj", objGroup)
        //     for (let key in objGroup) {
        //         groupList.push({ ...objGroup[key], key });
        //     }
        //     this.setState({
        //         groupList
        //     })
        // })
        this.props.groupList();
    }


    selectGroup = (list) => {

        // console.log("selected Group", list)
        this.props.getSeletcedGroup(list)

        // this.props.tabRef.goToPage(1)
    }
    componentWillReceiveProps(props) {
        // console.log("comp", props.messages)
        // console.log("compasda", props.SeletcedGroup)
        if (props.SeletcedGroup) {
            props.tabRef.goToPage(1)
        }
    }

    handleRequest = (key) => {
        // let key = list.key

        this.props.addMember(key)


        // let user = firebase.auth().currentUser
        // console.log("Current", user)
        // console.log("Current1", user1)

    }
    // signOut = () => {
    //     firebase.auth().signOut();
    // }
    render() {
        // const { groupList } = this.state
        // console.log("render props", this.props.GroupList)
        const Currentuser = firebase.auth().currentUser.uid
        console.log("this.props.SeletcedGroup", this.props.SeletcedGroup)
        console.log("this.props.messages", this.props.messages)

        return (
            <View style={{ height: height - 75 }}>
                <Header>
                    <Left>
                        <Button transparent>
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Groups List</Title>
                    </Body>
                    <Right />
                </Header>
                <View style={{ paddingBottom: 60 }}>
                    <ScrollView>
                        <List>
                            {

                                this.props.GroupList && this.props.GroupList.map((gList, index) => {
                                    let ary = gList.member ? Object.keys(gList.member) : []
                                    console.log("ary", ary)
                                    return (
                                        <ListItem thumbnail key={index} >
                                            <TouchableOpacity style={{ flexDirection: "row" }}
                                                onPress={() => this.selectGroup(gList)}
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

                                                        ary.indexOf(Currentuser) !== -1 ? <View><Text>View</Text></View> :
                                                            <TouchableOpacity onPress={() => this.handleRequest(gList.key)} >
                                                                <Text>Join</Text>
                                                            </TouchableOpacity>
                                                        // gList.member ?
                                                        //  console.log(Object.keys(gList.member))
                                                        // Object.keys(gList.member).map((key, index) => {
                                                        //     console.log(gList.member)
                                                        // console.log("><><><",key)
                                                        // console.log("curreentuser", Currentuser)

                                                        // if(key === Currentuser){
                                                        //     console.log("if", key)
                                                        //     return <Text key={index} >View</Text>
                                                        // } else{
                                                        //     console.log("else", key)

                                                        //     return <TouchableOpacity onPress={() => this.handleRequest(gList.key)} >
                                                        //         <Text>Join</Text>
                                                        //     </TouchableOpacity>
                                                        // }
                                                        // })

                                                        // :
                                                        // <TouchableOpacity onPress={() => this.handleRequest(gList.key)} >
                                                        //     <Text>Join</Text>
                                                        // </TouchableOpacity>

                                                        // gList.member && Object.keys(gList.member).map(uid => Currentuser === uid).length
                                                        // // gList.member
                                                        // ?
                                                        // <Text>View</Text>
                                                        // :
                                                        //     <TouchableOpacity onPress={() => this.handleRequest(gList.key)} >
                                                        //         <Text>Join</Text>
                                                        //     </TouchableOpacity>

                                                        // <TouchableOpacity >
                                                        // </TouchableOpacity>
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
                <Fab
                    style={{ alignContent: "center", backgroundColor: '#5067FF', marginTop: 20, position: "absolute" }}
                    position="bottomRight"
                    onPress={() => this.setState({ showModal: true })}
                >
                    <Icon name="add" />
                </Fab>
            </View>
            // <View>
            //     <Text>Tab1</Text>
            //     <Button title="Sign Out" color="red" onPress={this.signOut} />
            // </View>
        )
    }
}
const mapStateToProps = (state) => {
    console.log("???mapStateToProps>GroupDetails", state)
    return {
        // User: state.User,
        // userdetail: state.userDetail.userdetail
        GroupList: state.groups.groupList,
        SeletcedGroup: state.groups.SeletcedGroup,
        messages: state.groups.Messages,


    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        groupList: () => dispatch(groupList()),
        addMember: (key) => dispatch(addMember(key)),
        getSeletcedGroup: (list) => dispatch(getSeletcedGroup(list))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupsDetails)