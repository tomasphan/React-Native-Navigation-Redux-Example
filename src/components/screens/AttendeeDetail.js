import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image
} from 'react-native';
import { Card } from 'native-base';
import { Navigation } from 'react-native-navigation';
import { RkButton, RkText, RkStyleSheet, RkCard, RkTheme } from 'react-native-ui-kitten';
import { GradientButton } from '../gradientButton';
import formatNumber from '../../Utils/textUtils';

const AttendeeDetail = ({ name, picture, cell, email }) => {
  console.log(picture);
    return (
   <View style={styles.container}>   
   <Card style={styles.mb}>
          <Image style={styles.image} source={{ uri: picture }} />
          <View>
            <RkText rkType='header'>{name.first.toUpperCase()} {name.last.toUpperCase()}</RkText>
          </View>
        <View>
          <RkText style={{ textAlign: 'center' }}>
            {email}
          </RkText>
        </View>
      </Card>
      </View>
    );
  };

 const styles = RkStyleSheet.create(theme => ({
    container: {
      flex: 1,
    },
    header: {
      alignItems: 'center',
      paddingTop: 25,
      paddingBottom: 17
    },
    mb: {
      flex: 1,
      flexDirection: 'column',
      paddingTop: 25, 
      alignItems: 'center',
    },
    userInfo: {
      flexDirection: 'row',
      paddingVertical: 18,
    },
    bordered: {
      borderBottomWidth: 1,
      borderColor: theme.colors.border.base
    },
    section: {
      flex: 1,
      alignItems: 'center'
    },
    space: {
      marginBottom: 3
    },
    separator: {
      backgroundColor: theme.colors.border.base,
      alignSelf: 'center',
      flexDirection: 'row',
      flex: 0,
      width: 1,
      height: 42
    },
    buttons: {
      flexDirection: 'row',
      paddingVertical: 8,
    },
    button: {
      marginTop: 18,
      alignSelf: 'center',
      width: 140
    },
    image: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: 100,
      height: 100,
      backgroundColor: '#fff',
      borderRadius: 50,
      marginBottom: 20
    },
    badge: {
      width: 15,
      height: 15,
      borderRadius: 7.5,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      bottom: -2,
      right: -2
    },
    badgeText: {
      backgroundColor: 'transparent',
      fontSize: 9,
    }
  }));

export default AttendeeDetail;
