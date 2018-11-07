import React, { Component } from 'react';
import { Alert, Modal, Text, View, Button, TouchableOpacity } from 'react-native';
import { Form, Item, Input, Label, Icon, Left, Content, Thumbnail, Image } from 'native-base';
import firebase from 'react-native-firebase'
import ImagePicker from 'react-native-image-picker';
import { createGroup } from '../action';
import { connect } from 'react-redux';

// const iconUri = require('../grpIcon/dummyGroupIcon.png')
const imgurl = 'https://firebasestorage.googleapis.com/v0/b/chatapp-25815.appspot.com/o/images%2FdummyGroupIcon.png?alt=media&token=e96ec4ca-6b23-4611-a2a4-3aecc43c9e21'


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
        }
    }


    picImage = () => {
        // alert('clicked')
        ImagePicker.launchImageLibrary(options, (response) => {

            if (response.didCancel) {
            } else if (response.error) {
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
        const { groupName, description, imageUrl } = this.state

        let getimageUrl = imageUrl ? imageUrl : imgurl

        this.props.createGroup(groupName, description, getimageUrl)

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
        const { avatarSource, groupName, description } = this.state;

        if (groupName && description) {

            // Uri file = Uri.fromFile(new File("../grpIcon/dummyGroupIcon.png"))
            // var file = Uri.fromFile(new File("path/to/images/file.jpg"));

            let uri = avatarSource

            const storageRef = firebase.storage().ref("/images/" + uri);


            if(uri){
                storageRef.put(uri).then((snap) => {
                    storageRef.getDownloadURL().then((res) => {
                        this.setState({
                            imageUrl: res,
                        })
                        // alert("get Url")
                        this.pushData()
                    })
                })
            }else{
                this.pushData()
            }

          
        } else {
            Alert.alert('Please Enter All Fields.', '', null, { cancelable: false })
        }
    }
    render() {
        const { groupName, description, avatarSource, imageUrl, iconSource } = this.state
        // const isInvalid = groupName === '' || description === '';
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
                                <Item fixedLabel>
                                    <Label>Group Name</Label>
                                    <Input
                                        onChangeText={value => this.setState({ groupName: value })}
                                        value={groupName} />
                                </Item>
                                <Item fixedLabel>
                                    <Label>Description</Label>
                                    <Input
                                        onChangeText={value => this.setState({ description: value })}
                                        value={description}
                                    />
                                </Item>
                                <View style={{paddingTop:20, flexDirection:'row', justifyContent:'center'}}>
                                    <Thumbnail  square source={this.state.avatarSource ? { uri: avatarSource } :{ uri : imgurl }} />
                                </View>
                                <TouchableOpacity style={{ flexDirection: "row", justifyContent: 'center', paddingTop: 10, }} onPress={this.picImage} >
                                    <Label style={{ color: '#696969', }}  >Select your group icon</Label>
                                    {/* <Text style={{ justifyContent: 'flex-end', paddingRight: 40 }} >
                                        <Icon style={this.state.avatarSource ? { color: "green" } : { color: "gray" }} name="camera" ></Icon>
                                    </Text> */}
                                </TouchableOpacity>
                                {
                                    this.state.imageUrl ?
                                        <Text style={{ color: '#696969', textAlign: 'right' }} >Image Uploaded</Text> :
                                        null
                                }

                                <Text>{"\n"}</Text>
                                
                                <Button title="Submit" color="#66CCFF"
                                    onPress={this.handleSubmit} />
                            </Form>

                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}
// const mapStateToProps = (state) =>{
//     return{

//     }
// }

const mapDispatchToProps = (dispatch) => {
    return {
        createGroup: (groupName, description, getimageUrl) => {
            dispatch(createGroup(groupName, description, getimageUrl))
        }
    }
}

export default connect(null, mapDispatchToProps)(Creategroup)