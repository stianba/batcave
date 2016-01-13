import React, {Component} from 'react';

class Slogan extends Component {
  render() {
    return(
      <div>
        <h1>{this.props.slogan.text}</h1>
        <div className='score'>
          <p style={{marginBottom: '.4em'}}>poster://<span className='hl'>{this.props.slogan.poster}</span></p>
          <p style={{marginTop: '.4em'}}>score://<span className='hl'>{this.props.slogan.score}</span></p>
        </div>
        <div className='lock'>
          {
            this.props.locked
            ? <div>Locked</div>
            : <div onClick={this.props.onLockSlogan}>Lock</div>
          }
        </div>
      </div>
    );
  }
}

export default Slogan;
