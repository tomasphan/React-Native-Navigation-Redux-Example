import React, { Component } from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  RefreshControl,
  ListView,
} from 'react-native';
import { connect } from 'react-redux';
import Moment from 'moment';
import { ListItem } from 'react-native-elements';
import FetchSessionData from '../../actions/FetchSessionData';
//import SessionDetail from './SessionDetail';
import CalendarHeader from '../Calendar';
//import MomentTime from '../../Utils/Moment';

export class Sessions extends Component {
  constructor(props) {
    super(props);
     this.state = this.getInitialState();
     //console.log(this.state.dataSource);
  }

getInitialState() {
    return {
      currentDay: 0,
      dataBlob: {},
      dataSource: new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
        }),
    };
}

componentWillMount() {
  this.props.FetchSessionData().then(() => {
    const { data } = this.props;
    const tempDataBlob = this.state.dataBlob;
    const date = new Date(data[0].start).toDateString();
    tempDataBlob[date] = data;
    this.setState({
      currentDay: this.state.currentDay + 1,
      dataBlob: tempDataBlob
    });
  }).then(() => {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRowsAndSections(this.convertArrayToMap()),
      //dataSource: this.state.dataSource.cloneWithRowsAndSections(this.state.dataBlob),
      loaded: true
    });
  });
 }
 
  onRefresh() {
    const { data } = this.props;
    data.refreshing = true;
    //console.log('ACQUAH');
    console.log(this.state.dataSource.cloneWithRowsAndSections(this.convertArrayToMap()));
    if (data.refreshing) {
      this.props.FetchSessionData();
      this.setState({
        dataSource: this.state.dataSource.cloneWithRowsAndSections(this.convertArrayToMap())
      }); 
    }
  }

  onPushPress(item) {
    //console.log(item.name.first);
    //console.log(item);
    this.props.navigator.push({
      title: 'Session Details', //`${this.props.params.name}'s Profile!`,
      screen: 'EventApp2.SessionDetail',
      passProps: {
        description: item.description, 
        year: item.year,
        location: item.Location,
        title: item.title,
        start: item.start,
        end: item.end,
        //email: item.email,
        obj: {
          str: 'This is a prop passed in an object!',
          arr: [
            {
              //picture: item.picture.thumbnail
            }
          ]
        },
      }
    });
  }

  convertArrayToMap() {
    const { data } = this.props;
    const foodCategoryMap = {}; // Create the blank map
    data.forEach((item) => {
      if (!foodCategoryMap[item.eventday]) {
        // Create an entry in the map for the category if it hasn't yet been created
        foodCategoryMap[item.eventday] = [];
      }
      
      foodCategoryMap[item.eventday].push(item);
      //foodCategoryMap[Moment(date.eventdate).format('dddd, MMMM Do')].push(date);
    });

    return foodCategoryMap;
  } 

  renderItem = ({ ...item }) => (
        <ListItem
        title={
          <View>
          <Text style={styles.title}>
          {item.title}
          </Text>
          </View>
        }
        subtitle={
          <View>
          <Text style={styles.start}>
          {item.description}
          </Text>
          <Text style={styles.end}>
          {item.Location}
          </Text>
          </View>
        }
        subtitleNumberOfLines={4}
        //avatar={{ uri: item.image }}
        containerStyle={{ borderBottomWidth: 0 }}
        //onPress={this.onPushPress.bind(this)}
        onPress={() => this.onPushPress(item)}
  
        />
      );

  renderSeparator() {
    return (
      <View
        style={{
          height: 1,
          width: '95%',
          backgroundColor: '#CED0CE',
          marginLeft: '5%'
        }}
      />
    );
  }

  renderFooter() {
    const { sessionReducer } = this.props;
    if (sessionReducer.isFetching) {
      return (
        <View
          style={{
            paddingVertical: 20,
            borderTopWidth: 1,
            borderColor: '#CED0CE'
          }}
        >
          <ActivityIndicator animating size="large" />
        </View>
      );
    }
  }

  renderSectionHeader(sectionData, eventday) {
    return (
      <View style={styles.section}>
        <Text style={styles.sectionText}>{Moment(eventday).format('dddd, MMMM Do')}</Text>
      </View>
    );
}
  render() {
  //const { data } = this.props;
  //console.log(this.state.dataSource);
  //console.log('solomon lives here');
  // const data2 = [
  //   { title: 'D', data: ['Devin'] }, 
  //   { title: 'J', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie'] },
  // ];
   //this.copySessions();
    return (
      <View>
      <CalendarHeader />
      <ListView
      dataSource={this.state.dataSource}
      renderRow={this.renderItem}
      renderSectionHeader={this.renderSectionHeader}
      renderSeparator={this.renderSeparator}
      refreshControl={
        <RefreshControl
          refreshing={this.props.sessionReducer.refreshing}
          onRefresh={this.onRefresh.bind(this)}
        />
      }
      />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
  },
  header: {
    fontSize: 20,
  },
  itemBlock: {
    flexDirection: 'row',
    paddingBottom: 10,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  itemMeta: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    marginLeft: 10,
    color: '#0E7EAC',
    fontWeight: '200',
  },
  start: {
    fontSize: 13,
    marginLeft: 10,
    color: 'green'
  },
  end: {
    fontSize: 13,
    marginLeft: 10,
  },
  itemLastMessage: {
    fontSize: 14,
    color: '#111',
  },
  separator: {
    height: 0.5,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#555'
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F8F8'
  },
  postsListView: {
    backgroundColor: '#FFFFFD'
  },
  section: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#F0F0F0',
    //marginLeft: 5,

  },
  sectionText: {
    color: '#444444',
    fontWeight: '300',
    fontSize: 18,
    marginLeft: 5,
    padding: 5
  },
  headerText: {
    fontSize: 20,
    fontWeight: '400'
  }
};

function mapStateToProps(state) {
  return {
    sessionReducer: state.sessionReducer,
    data: state.sessionReducer.data
    //rehydrate: state.root.rehydrated
  };
}

export default connect(mapStateToProps, { FetchSessionData })(Sessions);
