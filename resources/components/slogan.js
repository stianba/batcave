import React, {Component} from 'react';
import moment from 'moment';

class Slogan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sincePostage: moment().diff(moment(this.props.slogan.time))
    };
  }

  componentDidMount() {
    this.__handleTime();
  }

  render() {
    return(
      <div>
        <h1>{this.props.slogan.text}</h1>
        <p style={{marginBottom: '.4em'}}>poster://<span className='hl'>{this.props.slogan.poster}</span></p>
        <p style={{marginTop: '.4em'}}>score://<span className='hl'>{this.state.sincePostage}</span></p>
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
}

export default Slogan;
