import React from 'react';
import ReactDOM from 'react-dom';
import Batcave from '../components/batcave';

if (typeof window !== 'undefined') {
  window.onload = () => {
    ReactDOM.render(<Batcave />, document.getElementById('app'));
  };
}
