import React, { Component } from 'react';
import {
  Button,
  Image,
} from 'react-native';
import { 
  Container, Header, 
  Content, Card, 
  CardItem, Thumbnail, 
  Text, Icon, 
  Left, Body, 
  Right
} from 'native-base';
import {Navigation} from 'react-native-navigation';
import { purgeStoredState } from 'redux-persist';
import { connect } from 'react-redux';
import * as appActions from '../../actions/index';

import configureStore from '../../store';

const { persistor } = configureStore();

export class Settings extends Component {
  constructor(props) {
    super(props);
    // if you want to listen on navigator events, set this up
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
    if (event.type === 'NavBarButtonPress') { // this is the event type for button presses
      if (event.id === 'logout2755') { 
        this.userLogout();
      }
    }
  }

  userLogout() {
    persistor.purge();
    //e.preventDefault();
    this.props.onLogout();
    //e.username.reset();
  }
  //onPress={() => onSignOut().then(() => navigation.navigate('SignedOut'))}
  render() {
    const { myUser } = this.props;

    //firstName
    //lastName
    //local
    //login
    //timeZone
    console.log(this.props.myUser.login);
    return (
    <Container>
      <Content>
        <Card>
          <CardItem>
            <Left>
              <Body>
                <Text>{myUser.firstName} {myUser.lastName}</Text>
                <Text note>{myUser.login}</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem cardBody>
          <Thumbnail large source={require('../../img/userProfile.png')} />
          </CardItem>
        </Card>
      </Content>
    </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
      //isLoggedIn: state.isLoggedIn,
      //isSignedIn: state.persistLogin,
      //_persist: state._persist.rehydrated,
      myUser: state.myInfo.myUser,
      logout: state.logout
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
      onLogout: () => {
        //console.log(this.props._persist);
        dispatch(appActions.appInitialized());
        //dispatch(appActions.itemsIsLoading(false));
      },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
