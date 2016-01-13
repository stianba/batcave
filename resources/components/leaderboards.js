import React, {Component} from 'react';
import _ from 'lodash';
import moment from 'moment';

class Leaderboards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leaderboards: props.leaderboards,
      indexOfCurrentSlogan: null
    };
  }

  render() {
    const slogans = this.props.leaderboards.map((slogan, index) => {
      const position = index + 1;

      return(
        <li className='leaderboards__item'>
          <div className='leaderboards__slogan'>
            <span className='leaderboards__position'>{position}.</span>
            {slogan.text}
          </div>
          <div className='leaderboards__poster'>By {slogan.poster}</div>
          <div className='leaderboards__score'>{slogan.score}</div>
        </li>
      );
    });

    return(
      <ul className='leaderboards'>
        {slogans}
      </ul>
    );
  }
}

export default Leaderboards;
