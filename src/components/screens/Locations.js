import React, { Component } from 'react';
import { Image, Button } from 'react-native';
import { 
    Container, Header, 
    Content, Card, 
    CardItem, Thumbnail, 
    Text, Icon, 
    Left, Body, 
    Right
} from 'native-base';
import { connect } from 'react-redux';
import openMap from 'react-native-open-maps';

export class Locations extends Component {
    goTo1275() {
        //1275 market 37.777793, -122.415765
        openMap({ latitude: 37.777793, longitude: -122.415765 });
      }

  render() {
    const { data } = this.props;
    console.log(data.Location);
    return (
        <Container>
        <Content>
          <Card>
            <CardItem>
              <Left>
                <Thumbnail source={require('../../img/map-marker-icon.png')} />
                <Body>
                  <Text>Offsite Event</Text>
                  <Text note>Half-Moon Bay 5:00PM</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image style={{ height: 200, width: null, flex: 1 }} source={require('../../img/1275.png')} />
            </CardItem>
            <CardItem>
            <Button
                color={'#bdc3c7'}
                onPress={this.goTo1275}
                title="Click Here for Directions" 
            />
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

function mapStateToProps(state) {
    return {
      data: state.sessionReducer.data
    };
  }
  
  export default connect(
    mapStateToProps,
  )(Locations);
