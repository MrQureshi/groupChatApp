import React from 'react'
import {
    Container, Header, Modal, Content, View, Fab, Button, Icon, Left, Body, Title, Right,
    List, ListItem, Thumbnail
} from 'native-base';
import { Text, Dimensions, ScrollView, TouchableOpacity, TouchableHighlight } from 'react-native'
import firebase from 'react-native-firebase'
import Create from '../Creategroupegroup'
const { height, width, fontScale } = Dimensions.get("window")
const successImageUri = 'https://muawia.com/wp-content/uploads/2018/07/trace-3157431__340.jpg';

export default class GroupsDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            groupList:[]
        }
    }
    componentDidMount() {
        firebase.database().ref(`Groups/`).on('value', snap => {
            let groupList = [];
            console.log("aaaaaaaaaaa")
            let objGroup = snap.val();
            console.log("obj", objGroup)
            for (let key in objGroup) {
                groupList.push({ ...objGroup[key], key });
            }
            this.setState({
                groupList
            })
        })
    }
    // signOut = () => {
    //     firebase.auth().signOut();
    // }
    render() {
        const {groupList} = this.state
        console.log("render", groupList)
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
                                groupList.map((gList, index)=>{
                                    return(
                                        <ListItem thumbnail key={index} >
                                        <TouchableOpacity style={{ flexDirection: "row" }}>
                                            <Left>
                                                <Thumbnail square source={{ uri: successImageUri }} />
                                            </Left>
                                            <Body>
                                                <Text>{gList.groupName}</Text>
                                                <Text note numberOfLines={1}>{gList.description} ..</Text>
                                            </Body>
                                            <Right>
                                                <Button transparent>
                                                    <Text>View</Text>
                                                </Button>
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

