import React, { Component } from 'react'
import { Text, Dimensions, TouchableOpacity } from 'react-native'
import { connect } from "react-redux"
import { Header, View, Button, Icon, Left, Body, Title, Right, ListItem, List, } from 'native-base';
import { ViewMembers, makeAdmin } from '../action'

const { height, width, fontScale } = Dimensions.get("window")


class Members extends Component {
    constructor(props) {
        super(props)


    }

    componentDidMount() {
        const { key } = this.props.selectedGroup
        this.props.ViewMembers(key)

    }
    handleMakeAdmin(memList) {
        const { groupKey, userkey, Token, userName, phoneNumber } = memList
        this.props.makeAdmin(groupKey, userkey, Token, userName, phoneNumber)
    }
    
    render() {
        const memList = this.props.membersList && this.props.membersList
        return (
            <View style={{ height: height - 75 }}>
                <Header>
                    <Left>
                        <Button transparent>
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Members</Title>
                    </Body>
                    <Right />
                </Header>
                <View>
                    <List>
                        {
                            memList ?
                                memList.map((memList, index) => {
                                    return (
                                        <ListItem key={index} >
                                            <Body>
                                                <Text>{memList.userName}</Text>
                                            </Body>
                                            <Right style={{ flexDirection: "row", justifyContent: "flex-end" }}>
                                            {
                                                memList.Admin && memList.Admin ? 
                                                <Text style={{ paddingLeft: 25, color: "green", width: 80 }} >Admin</Text>
                                                :
                                                <TouchableOpacity onPress={() => this.handleMakeAdmin(memList)}>
                                                    <Text style={{ paddingLeft: 25, width: 120 }} >Make Admin</Text>
                                                </TouchableOpacity>
                                            }
                                            </Right>
                                        </ListItem>
                                    )
                                })
                                : <View><Text style={{ justifyContent: "center", textAlign: "center" }} >No Member Found</Text></View>

                        }
                    </List>
                </View>
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        // logUser: state.Signin.logUser,
        selectedGroup: state.groups.SelectedGroup,
        membersList: state.Members.members
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ViewMembers: (key) => dispatch(ViewMembers(key)),
        makeAdmin: (groupKey, userkey, Token, userName, phoneNumber) => dispatch(makeAdmin(groupKey, userkey, Token, userName, phoneNumber))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Members)