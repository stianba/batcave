import React, {Component} from 'react';
import moment from 'moment';

class Slogan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      time: this.props.time
    };
  }

  componentDidMount() {
    this.__handleTime();
  }

  render() {
    return(
      <div>
        <h1>{this.props.slogan}</h1>
        <p>Time since postage: {this.state.time}.</p>
      </div>
    );
  }

  __handleTime() {
    if (typeof window === 'undefined') {
      return false;
    }

    window.setInterval(() => {
      this.setState({
        time: this.state.time + 1
      });
    }, 1000);
  }
}

export default Slogan;
