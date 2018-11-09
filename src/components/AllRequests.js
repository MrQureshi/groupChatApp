import React, { Component } from 'react'
import { Text, Dimensions, TouchableOpacity } from 'react-native'
import { connect } from "react-redux"
import { Header, View, Button, Icon, Left, Body, Title, Right, ListItem, } from 'native-base';
import { acceptRequest, rejectRequest, AllRequests } from '../store/action'
// import firebase from 'react-native-firebase'

const { height, width, fontScale } = Dimensions.get("window")


class comAllRequests extends Component {
    constructor(props) {
        super(props)

        this.state = {
            requestList: []
        }
    }
    componentDidMount() {
        this.props.AllRequests();
    }
    handleAccept = (rList) => {


        const { groupKey, Token, userName, userkey, phoneNumber } = rList


        this.props.acceptRequest(groupKey, Token, userName, userkey, phoneNumber)
    }
    handleReject=(rList)=>{
        const { groupKey, userkey } = rList


        this.props.rejectRequest(groupKey, userkey)
    }

    // componentWillReceiveProps(nextProps){
    // }
    // handleAccept = (rList) => {
    //     const { groupKey, Token, userName, userkey, phoneNumber } = rList
    //     this.props.acceptRequest(groupKey, Token, userName, userkey, phoneNumber)
    // }
    // handleReject=(rList)=>{
    //     const { groupKey, userkey } = rList
    //     this.props.rejectRequest(groupKey, userkey)
    // }
    render() {
        const reqList = this.props.reqList && this.props.reqList


        return (
            <View style={{ height: height, backgroundColor:"#E5E5E5" }}>
                <Header style={{ backgroundColor:"#66CCFF"}}>
                    <Left>
                        <Button transparent>
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Request</Title>
                    </Body>
                    <Right />
                </Header>
                <View>
                    {
                        reqList && reqList.length ?
                        reqList.map((rList, index) => {
                            return (
                                <ListItem key={index} style={{ marginLeft: 15, marginRight: 15, paddingLeft: 10, paddingRight: 10,  borderRadius:5,  marginTop:5, backgroundColor: "white" }} >
                                    <Body>
                                        <Text>{rList.userName}</Text>
                                        <Text note style={{color: 'green'}} >{rList.groupName}</Text>

                                    </Body>
                                    <Right style={{ flexDirection: "row", justifyContent: "flex-end" }}>
                                        <TouchableOpacity onPress={() => this.handleAccept(rList)}>
                                            <Text >
                                                <Icon style={{ fontSize: 22, color: "black" }} name="checkmark" />
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.handleReject(rList)}>
                                            <Text style={{ paddingLeft: 25 }} >
                                                <Icon style={{ fontSize: 22, color: "black" }} name="close" />
                                            </Text>
                                        </TouchableOpacity>
                                    </Right>
                                </ListItem>
                            )
                        })
                        :
                        <Text style={{ justifyContent: "center", textAlign: "center" }} >No request</Text>
                    }
                </View>
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        // logUser: state.Signin.logUser,
        reqList: state.Requests.Allrequests,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        AllRequests: () => dispatch(AllRequests()),
        acceptRequest: (groupKey, Token, userName, userkey, phoneNumber) => dispatch(acceptRequest(groupKey, Token, userName, userkey, phoneNumber)),
        rejectRequest: (groupKey, userkey)=>dispatch(rejectRequest(groupKey, userkey))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(comAllRequests)