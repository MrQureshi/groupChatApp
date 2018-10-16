

import React from 'react'
// import { View, Text, Dimensions } from 'react-native'
// import { Container, Header, Content, Footer, FooterTab, Button, Icon, View } from 'native-base';

import { Container, Header, Content, Tab, Tabs, View, Icon, TabHeading } from 'native-base';
// import firebase from 'react-native-firebase'
import Tab1 from '../Chata/Chat';
import Tab2 from './extra/AddGroupp';
// const { height, width, fontScale } = Dimensions.get("window")

export default class Home extends React.Component {

    // signOut = () => {
    //     firebase.auth().signOut();
    // }
    render() {
        return (
            <Tabs tabBarPosition="bottom">
                <Tab heading={<TabHeading><Icon name="chatbubbles" /></TabHeading>}>
                    <Tab1 />
                </Tab>
                <Tab heading={<TabHeading><Icon name="people" /></TabHeading>}>
                    <Tab2 />
                </Tab>
            </Tabs>
        )
    }

}
