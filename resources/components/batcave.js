import React, {Component} from 'react';
import io from 'socket.io-client';
import moment from 'moment';
import $ from 'jquery';
import Slogan from './slogan';
import Post from './post';
import Leaderboards from './leaderboards';

class Batcave extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentSlogan: null,
      locked: false
    };

    this.newSlogan = this.newSlogan.bind(this);
    this.unlockSlogan = this.unlockSlogan.bind(this);
    this.lockSlogan = this.lockSlogan.bind(this);
  }

  componentDidMount() {
    this.__socket();
    this.__fetchSlogan();
  }

  newSlogan(slogan) {
    this.setState({
      currentSlogan: slogan,
      locked: true
    });
  }

  unlockSlogan() {
    this.setState({
      locked: false
    });
  }

  lockSlogan(slogan) {
    this.setState({
      currentSlogan: slogan,
      locked: true
    });
  }

  render() {
    return(
      <div className='app'>
        {
          this.state.currentSlogan
          ? <Slogan slogan={this.state.currentSlogan} locked={this.state.locked} onUnlockSlogan={this.unlockSlogan} onLockSlogan={this.lockSlogan} />
          : <h1>Loading...</h1>
        }
        <hr />
        <div className='half left'>
          <Post locked={this.state.locked} onHandlePost={this.newSlogan} />
        </div>
        <div className='half right'>
          <Leaderboards slogans={this.state.topList} />
        </div>
      </div>
    );
  }

  __socket() {
    if (typeof window === 'undefined') {
      return false;
    }

    const socket = io();
    socket.on('new', slogan => {
      this.newSlogan(slogan);
    });

    socket.on('lock', payload => {
      const slogan = Object.assign(
        {},
        this.state.currentSlogan,
        {lockedUntil: payload.lockedUntil}
      );
      this.lockSlogan(slogan);
    });
  }

  __fetchSlogan() {
    if (typeof window === 'undefined') {
      return false;
    }

    $.getJSON('/api/currentSlogan', currentSlogan => {
      this.setState({
        currentSlogan: currentSlogan,
        locked: moment(moment()).isBefore(currentSlogan.lockedUntil)
      });
    });
  }
}

export default Batcave;
