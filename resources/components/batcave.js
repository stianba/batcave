import React, {Component} from 'react';
import $ from 'jquery';
import Slogan from './slogan';

class Batcave extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentSlogan: null
    };
  }

  componentDidMount() {
    this.__fetchSlogan();
  }

  render() {
    return(
      <div className='app'>
        {
          this.state.currentSlogan
          ? <Slogan slogan={this.state.currentSlogan} />
          : <h1>Loading...</h1>
        }
        <hr></hr>
      </div>
    );
  }

  __fetchSlogan() {
    if (typeof window === 'undefined') {
      return false;
    }

    $.getJSON('/api/currentSlogan', currentSlogan => {
      this.setState({
        currentSlogan: currentSlogan
      });
    });
  }
}

export default Batcave;
