import * as React from 'react';
import { DARK } from '../../constants/Colors';
import { ThemeContext } from './ThemeContext';

export default class ThemeProvider extends React.Component {
  constructor() {
    super();
    this.state = {
      setColor: this.setColor.bind(this),
      colors: DARK,
    };
  }
  setColor(colors) {
    this.setState({ colors });
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
