import React, {Component} from 'react';
import Slogan from './slogan';
import {slogans, currentSlogan} from '../../api/slogans.js';

class Batcave extends Component {
  render() {
    return <Slogan slogan={currentSlogan} />;
  }
}

export default Batcave;
