import React from 'react';
import {
  RkButton,
  RkText,
  RkComponent
} from 'react-native-ui-kitten';

export class GradientButton extends RkComponent {
  componentName = 'GradientButton';
  typeMapping = {
    button: {},
    gradient: {},
    text: {}
  };

  renderContent(textStyle) {
    if (this.props.text) {
      return (
          <RkText style={textStyle}>
            {this.props.text}
          </RkText>
      );
  }
}

  render() {
    const { button, gradient, text: textStyle } = this.defineStyles();
    const colors = this.extractNonStyleValue(gradient, 'colors');
    const { style, rkType, ...otherProps } = this.props;

    //colors = this.props.colors ? this.props.colors : colors;

    return (
      <RkButton 
      rkType='stretch'
      style={[button, style]}
      {...otherProps}
      >
        <LinearGradient 
        colors={colors}
        start={{ x: 0.0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={[gradient]}
        >
          {this.renderContent(textStyle)}
        </LinearGradient>
      </RkButton>
    );
  }
 }
