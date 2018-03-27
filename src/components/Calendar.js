// Import libraries for making a component
import React from 'react';
import { Text, View } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import CalendarStrip from 'react-native-calendar-strip';
// Make a component
const CalendarHeader = (props) => {
    const { viewStyle } = styles;

    return ( 
    <View style={viewStyle}>
    <CalendarStrip
    calendarAnimation={{ type: 'sequence', duration: 30 }}
    daySelectionAnimation={{ type: 'background', duration: 300, highlightColor: '#F0F0F0' }}
    style={{
        height: 100, 
        width: '100%',
        paddingTop: 20, 
        paddingBottom: 10
    }}
    calendarHeaderStyle={{ color: '#909090' }}
    calendarColor={'#FFFFFF'}
    dateNumberStyle={{ color: '#909090' }}
    dateNameStyle={{ color: '#909090' }}
    iconContainer={{ flex: 0.1 }}
    startDate={'2018-04-13'}
    endDate={'2018-04-18'}
    />
    </View>
    );
};

const styles = {
    viewStyle: {
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        fontSize: 20
    }
};
//Make the component available to other parts of the app
export default CalendarHeader;
