import React from 'react';
import ReactDOM from 'react-dom';
import Batcave from '../components/Batcave';

if (typeof window !== 'undefined') {
  window.onload = () => {
    ReactDOM.render(<Batcave />, document.getElementById('app'));
  };
}
