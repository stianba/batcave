import React, {Component} from 'react';
import $ from 'jquery';

class Post extends Component {
  constructor(props) {
    super(props);

    this.__post = this.__post.bind(this);
  }

  render() {
    const buttonClassName = this.props.locked ? 'locked' : null;
    const buttonLabel = this.props.locked ? 'Locked' : 'DO IT!';

    return(
      <form action='#' method='post' onSubmit={this.__post}>
        <label htmlFor='t'>Be profound:</label>
        <input ref='text' id='t' name='text' type='text' required placeholder='Dang, son.' />
        <label htmlFor='p'>And sign it:</label>
        <input ref='poster' id='p' name='poster' type='text' required placeholder='Dang, son.' />
        <button className={buttonClassName} disabled={this.props.locked} type='submit'>{buttonLabel}</button>
      </form>
    );
  }

  __post(e) {
    e.preventDefault();

    const data = {
      text: this.refs.text.value,
      poster: this.refs.poster.value
    };

    this.refs.text.value = null;
    this.refs.poster.value = null;

    $.post('/api/slogan', data, response => {
      if (response.hasOwnProperty('text')) {
        console.log(response);
        this.props.onHandlePost(response);
      }
    });
  }
}

export default Post;
