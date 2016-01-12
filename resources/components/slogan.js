import React, {Component} from 'react';
import moment from 'moment';
import $ from 'jquery';

class Slogan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sincePostage: moment().diff(moment(this.props.slogan.time))
    };

    this.__lockSlogan = this.__lockSlogan.bind(this);
  }

  componentDidMount() {
    this.__handleTime();
  }

  render() {
    return(
      <div>
        <h1>{this.props.slogan.text}</h1>
        <div className='score'>
          <p style={{marginBottom: '.4em'}}>poster://<span className='hl'>{this.props.slogan.poster}</span></p>
          <p style={{marginTop: '.4em'}}>score://<span className='hl'>{this.state.sincePostage}</span></p>
        </div>
        <div className='lock'>
          {
            this.props.locked
            ? <div>Locked</div>
            : <div onClick={this.__lockSlogan}>Lock</div>
          }
        </div>
      </div>
    );
  }

  __handleTime() {
    if (typeof window === 'undefined') {
      return false;
    }

    window.setInterval(() => {
      this.setState({
        sincePostage: moment().diff(moment(this.props.slogan.time))
      });

      if (moment(moment()).isAfter(this.props.slogan.lockedUntil)) {
        this.props.onUnlockSlogan();
      }
    }, 1);
  }

  __lockSlogan() {
    if (typeof window === 'undefined') {
      return false;
    }

    $.post(
      '/api/currentSlogan/lock',
      {slogan: this.props.slogan.id},
      response => {
        if (response.hasOwnProperty('code')) {
          if (response.code === 'success') {
            const slogan = Object.assign(
              {},
              this.props.slogan,
              {lockedUntil: response.lockedUntil}
            );
            return this.props.onLockSlogan(slogan);
          }
        }
    });
  }
}

export default Slogan;
