import React from 'react';
import {
  Image,
  View
} from 'react-native';
import {
  RkComponent,
  RkText,
  RkTheme
} from 'react-native-ui-kitten';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export class Avatar extends RkComponent {
  componentName = 'Avatar';
  typeMapping = {
    container: {},
    image: {},
    badge: {},
    badgeText: {}
  };

  renderImg(styles) {
    const { image, badge, badgeText } = styles;
    return (
      <View>
        <Image style={image} source={this.props.picture} />
        { this.props.badge && this.renderBadge(badge, badgeText)}
      </View>
    );
  }

  renderBadge(style, textStyle) {
    let symbol;
    let backgroundColor;
    let color;

    switch (this.props.badge) {
      case 'like':
        symbol = FontAwesome.heart;
        backgroundColor = RkTheme.current.colors.badge.likeBackground;
        color = RkTheme.current.colors.badge.likeForeground;
        break;
      case 'follow':
        symbol = FontAwesome.plus;
        backgroundColor = RkTheme.current.colors.badge.plusBackground;
        color = RkTheme.current.colors.badge.plusForeground;
        break;

        default: return 'follow';
    }

    return (
      <View style={[style, { backgroundColor }]}>
        <RkText rkType='awesome' style={[textStyle, { color }]}>
          {symbol}
        </RkText>
      </View>
    );
  }

  render() {
    const { container, ...other } = this.defineStyles();
    return (
      <View style={[container, this.props.style]}>
        {this.renderImg(other)}
      </View>
    );
  }
}
