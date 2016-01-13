import React, {Component} from 'react';
import io from 'socket.io-client';
import _ from 'lodash';
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
      locked: false,
      leaderboards: []
    };

    this.newSlogan = this.newSlogan.bind(this);
    this.unlockSlogan = this.unlockSlogan.bind(this);
    this.lockSlogan = this.lockSlogan.bind(this);
  }

  componentDidMount() {
    this.__socket();
    this.__fetchSlogan();
    this.__fetchLeaderboards();
  }

  newSlogan(slogan) {
    this.setState({
      currentSlogan: slogan,
      locked: true
    }, () => {
      this.__handleTime();
    });
  }

  unlockSlogan() {
    this.setState({
      locked: false
    });
  }

  lockSlogan() {
    if (typeof window === 'undefined') {
      return false;
    }

    $.post(
      '/api/currentSlogan/lock',
      {slogan: this.state.currentSlogan.id},
      response => {
        if (response.hasOwnProperty('code')) {
          if (response.code === 'success') {
            const slogan = Object.assign(
              {},
              this.state.currentSlogan,
              {lockedUntil: response.lockedUntil}
            );

            this.setState({
              currentSlogan: slogan,
              locked: true
            });
          }
        }
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
        <div className='columns'>
          <div className='half left'>
            <Post locked={this.state.locked} onHandlePost={this.newSlogan} />
          </div>
          <div className='half right'>
            <h2>Leaderboards</h2>
            {this.state.leaderboards.length ? <Leaderboards leaderboards={this.state.leaderboards} currentSlogan={this.state.currentSlogan} /> : null}
          </div>
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

      this.setState({
        currentSlogan: slogan,
        locked: true
      });
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
      }, () => {
        this.__handleTime();
      });
    });
  }

  __fetchLeaderboards() {
    if (typeof window === 'undefined') {
      return false;
    }

    $.getJSON('/api/leaderboards', leaderboards => {
      this.setState({
        leaderboards: leaderboards
      });
    });
  }

  __handleTime() {
    if (typeof window === 'undefined') {
      return false;
    }

    window.setInterval(() => {
      const scoredSlogan = Object.assign(
        {},
        this.state.currentSlogan,
        {score: moment().diff(moment(this.state.currentSlogan.time))}
      );

      this.setState({
        currentSlogan: scoredSlogan,
        leaderboards: this.__handleLiveLeaderboards(
          this.state.leaderboards,
          scoredSlogan
        )
      });

      if (moment(moment()).isAfter(this.state.currentSlogan.lockedUntil)) {
        this.unlockSlogan();
      }
    }, 1);
  }

  __handleLiveLeaderboards(leaderboards, slogan) {
    if (!slogan.hasOwnProperty('id')) {
      return leaderboards;
    }

    const index = _.findIndex(
      leaderboards,
      {id: slogan.id}
    );

    if (index < 0) {
      leaderboards.push(slogan);
    } else {
      leaderboards[index].score = slogan.score;
    }

    return _.sortByOrder(leaderboards, 'score', 'desc');
  }
}

export default Batcave;
