import React, { Component } from 'react';
import { Modal, Text, View, Button, TouchableOpacity } from 'react-native';
import { Form, Item, Input, Label, Icon, Left, Content } from 'native-base';
import firebase from 'react-native-firebase'
import ImagePicker from 'react-native-image-picker';
import { createGroup } from '../action';
import {connect} from 'react-redux';



const options = {
    title: 'image Picker',
    chooseFromLibraryButtonTitle: "Choose Photo"
}
// const options = {
//     title: 'Select Avatar',
//     customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
//     storageOptions: {
//       skipBackup: true,
//       path: 'images',
//     },
//   };

class Creategroup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            groupName: '',
            description: '',
            modalVisible: false,
            avatarSource: null,
            imageUrl: null,
            join: false

        }
    }
    picImage = () => {
        // alert('clicked')
        ImagePicker.launchImageLibrary(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const source = response.uri;

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source,
                });
            }
        });
    }
    pushData = () => {
        const { groupName, description, imageUrl, join } = this.state

        this.props.createGroup(groupName, description, imageUrl, join)
        
        this.setState({
            groupName: '',
            description: '',
            imageUrl: null,
        })
        this.props.close()
    }
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }
    handleClose = () => {
        this.props.close()
    }
    handleSubmit = () => {
        const { avatarSource } = this.state;
        
        let uri = avatarSource

        const storageRef = firebase.storage().ref("/images/" + uri);

        storageRef.put(this.state.avatarSource).then((snap) => {
            storageRef.getDownloadURL().then((res) => {
                this.setState({
                    imageUrl: res,
                })

                this.pushData()
                // setTimeout(() => {
                //     console.log("setTimeOut", res)
                //     this.setState({
                //         imageUrl: res,
                //     })
                //     // this.pushData()
                // }, 10000)
            })
        })

    }

    render() {
        const { groupName, description, avatarSource, imageUrl } = this.state
        // console.log("render imageUrl", imageUrl)
        const isInvalid = groupName === '' || description === '' || avatarSource === null;

        return (
            <View >
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={true}
                    onRequestClose={() => {
                        this.props.close()
                    }}>
                    <View style={{ marginTop: 30, padding: 20 }}>
                        <View>
                            <TouchableOpacity onPress={this.handleClose} >
                                <Text style={{ textAlign: "center" }}>
                                    <Icon name="close" />
                                </Text>
                            </TouchableOpacity>
                            <Text style={{ textAlign: "center", fontSize: 25 }}>Create Group</Text>
                            <Form>
                                <Item floatingLabel>
                                    <Label>Group Name</Label>
                                    <Input
                                        onChangeText={value => this.setState({ groupName: value })}
                                        value={groupName}
                                    />
                                </Item>
                                <Item floatingLabel>
                                    <Label>Description</Label>
                                    <Input
                                        onChangeText={value => this.setState({ description: value })}
                                        value={description}
                                    />
                                </Item>
                                <TouchableOpacity style={{ flexDirection: "row", justifyContent: 'space-between', padding: 5, marginTop: 25, marginLeft: 12, height: 35 }} onPress={this.picImage} >
                                    <Label style={{ color: '#696969', }}  >Upload Image</Label>
                                    <Text style={{ justifyContent: 'flex-end', paddingRight: 40 }} >
                                        <Icon style={this.state.avatarSource ? { color: "green" } : { color: "gray" }} name="camera" ></Icon>
                                    </Text>
                                </TouchableOpacity>
                                {
                                    this.state.imageUrl ?
                                        <Text style={{ color: '#696969', textAlign: 'right' }} >Image Uploaded</Text> :
                                        null
                                }

                                <Text>{"\n"}</Text>
                                <Button title="Submit" color="green"
                                    disabled={isInvalid}
                                    onPress={this.handleSubmit} />
                                {/* onPress={() => { this.props.close() }} /> */}

                            </Form>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}
// const mapStateToProps = (state) =>{
//     console.log(state)
//     return{

//     }
// }

const mapDispatchToProps = (dispatch) =>{
    return{
        createGroup: (groupName, description, imageUrl, join) =>{
            dispatch(createGroup(groupName, description, imageUrl, join))
        }
    }
}

export default connect(null, mapDispatchToProps)(Creategroup)