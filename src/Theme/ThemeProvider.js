import * as React from 'react';
import { DARK } from '../../constants/Colors';
import { ThemeContext } from './ThemeContext';

export default class ThemeProvider extends React.Component {
  constructor() {
    super();
    this.state = {
      setColor: this.setColor.bind(this),
      colors: DARK,
      //lighter theme vs darker theme
      isLight: false,
      setIsLight: this.setIsLight.bind(this),
    };
  }
  setColor(colors) {
    this.setState({ colors });
  }
  setIsLight(isLight) {
    this.setState({ isLight });
  }
  render() {
    return (
      <ThemeContext.Provider
        value={{
          themeContext: {
            ...this.state,
          },
        }}
      >
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}
