import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { List, ListItem } from 'react-native-elements';

const SessionCard = ({ name }) => (
       <View style={styles.container}>
       <Text>{name}</Text>

  
       </View>
   );


const styles = StyleSheet.create({
    container: {
        display: 'flex'
    }
});

export default SessionCard;
