

import React from 'react'
import { Text, Dimensions } from 'react-native'

import { Container, Header, Content, Tab, Tabs, View, Icon, TabHeading } from 'native-base';
// import firebase from 'react-native-firebase'
import Chat from '../components/Chat'
import Group from '../components/Groups'
const { height, width, fontScale } = Dimensions.get("window")

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabs: null
        }
    }
    componentDidMount() {
        setTimeout(() => {
            if (this.tabRef) { this.setState({ tabs: this.tabRef }) }
        }, 0)
    }
    // signOut = () => {
    //     firebase.auth().signOut();
    // }
    render() {
        return (
            // <View>
            //     <Text>Dashboard</Text>
            // </View>
            <Tabs locked  ref={(ref) => { this.tabRef = ref; }} tabBarPosition="bottom">
                <Tab heading={<TabHeading><Icon name="people" /></TabHeading>}>
                    <Group tabRef={this.state.tabs} />
                </Tab>
                <Tab heading={<TabHeading><Icon name="chatbubbles" /></TabHeading>}>
                    <Chat tabRef={this.state.tabs} />
                </Tab>
            </Tabs>
        )
    }

}
