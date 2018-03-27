import React, { Component } from 'react';
import {
    Text,
  } from 'react-native';
import Moment from 'moment';

class MomentTime extends Component {
render() {
    const dateTime = '2016-05-02T00:00:00';
    const formattedDT = Moment(dateTime).format('LT');
    return ( 
        <Text> {formattedDT} </Text>
    );
    }
}
export default MomentTime;
