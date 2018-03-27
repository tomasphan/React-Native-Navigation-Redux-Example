import React, { Component } from 'react';
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableHighlight,
  TouchableOpacity,
  Alert,
  DetailViewComponent,
  ListView
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { List, ListItem, SearchBar } from 'react-native-elements';
import FetchAttendeeData from '../../actions/FetchAttendeeData';
import AttendeeDetail from './AttendeeDetail';


export class Attendees extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      searchTerm: {},
    };
}


  componentWillMount() {
   this.props.FetchAttendeeData().then(() => {
    const { data } = this.props;
    this.setState({
      searchTerm: data
    });
   });
  }

  onPress(name) {
    console.log(name);
  }

  onRefresh() {
    const { data } = this.props;
    data.refreshing = true;
    //console.log(data.refreshing);
    if (data.refreshing) {
      this.props.FetchAttendeeData();
      this.setState({
        searchTerm: data
      });
    }
  }

  onPushPress(item) {
    //console.log(item.name.first);
    //console.log(item);
    this.props.navigator.push({
      title: `${item.name.first.toUpperCase()}`, //`${this.props.params.name}'s Profile!`,
      screen: 'EventApp2.AttendeeDetail',
      passProps: {
        name: item.name, 
        picture: item.picture.large,
        cell: item.cell,
        email: item.email,
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

  searchText(e) {
    //const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const text = e.toLowerCase();
    console.log(text);
   const text2 = text.replace(/^\w+([\\.-]?\w+)*@\w+([?.-]?\w+)*(\.\w{2,3})+$/, '').replace(/[\u0080-\uFFFF]/g, '').replace('\\').replace('?');
    //const cleanText = (reg.test(e));
    const people = this.props.data;
    console.log(text2);
    console.log(e);
    const filteredName = people.filter((item) => {
        return item.name.first.toLowerCase().match(text2);
    });
    console.log(filteredName);
    if (!text2 || text2 === '') {
      this.setState({
        searchTerm: filteredName,  
        noData: false
      });
    } else if (!Array.isArray(filteredName) && !filteredName.length) {
      // set no data flag to true so as to render flatlist conditionally
      this.setState({
        noData: true
      });
    } else if (Array.isArray(filteredName)) {
      this.setState({
        noData: false,
        //data: this.state.data.cloneWithRows(filteredName)
        searchTerm: filteredName
      });
    }
  }

 renderItem = ({ item }) => (
    <ListItem
      roundAvatar
      title={`${item.name.first} ${item.name.last}`}
      subtitle={item.email}
      avatar={{ uri: item.picture.thumbnail }}
      containerStyle={{ borderBottomWidth: 0 }}
      //onPress={this.onPushPress.bind(this)}
      onPress={() => this.onPushPress(item)}

    />
  );

  renderHeader = () => {
    return (
      <SearchBar
      containerStyle={styles.search}
      inputStyle={styles.searchInput}
      placeholder="Search Attendees"
      placeholderTextColor="white"
      icon={{ color: '#86939e', style: styles.searchIcon }}
      clearIcon
      //onChangeText={(e) => this.searchText(e)}
      onChangeText={this.searchText.bind(this)}
      //value={value}
      lightTheme round
      />
    );
  }

  renderSeparator() {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%'
        }}
      />
    );
  }

  renderFooter() {
    const { attendeeReducer } = this.props;
    if (attendeeReducer.isFetching) {
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

  render() {
    //const { attendeeReducer } = this.props;
    //const filteredAssets = this.state.data;

    const filteredAssets = this.state.searchTerm
    ? this.props.data.filter(item => {
        return item.name.first.indexOf(this.state.searchTerm) > -1;
      })
    : this.props.data;
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    const dataSource = ds.cloneWithRows(filteredAssets)._dataBlob.s1;
    //const people = dataSource._dataBlob.s1;
   //console.log(this.state.searchTerm);    
   //console.log(dataSource);  
    return ( 
      <View style={styles.container}>
      <FlatList
          data={this.state.searchTerm}
          noData={this.state.noData}
          keyExtractor={item => item.email}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter()}
          refreshControl={
            <RefreshControl
              refreshing={this.props.attendeeReducer.refreshing}
              onRefresh={this.onRefresh.bind(this)}
            />
          }
          renderItem={this.renderItem}
      />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    marginTop: 20,
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
  itemName: {
    fontSize: 20,
  },
  itemLastMessage: {
    fontSize: 14,
    color: '#111',
  },
  separator: {
    height: 0.5,
    width: '80%',
    alignSelf: 'center',
    backgroundColor: '#555'
  },
  header: {
    padding: 10,
  },
  headerText: {
    fontSize: 30,
    fontWeight: '900'
  }
};

function mapStateToProps(state) {
  return {
    attendeeReducer: state.attendeeReducer,
    value: state.searchReducer.value,
    data: state.attendeeReducer.data
  };
}

export default connect(mapStateToProps, { FetchAttendeeData })(Attendees);
