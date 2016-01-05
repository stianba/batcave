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
        <p>Poster: {this.props.slogan.poster}.</p>
        <p>Time since postage: {this.state.sincePostage}.</p>
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
    }, 1);
  }
}

export default Slogan;
