import React from 'react';
import './App.css';
import axios from 'axios';
import PersistentDrawerLeft from './PersistentDrawerLeft.js';
import {BrowserRouter} from 'react-router-dom';

export default class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
        message: ''
    };

  }

  render () {
    return (
      <div className="App">
          <BrowserRouter>
          <PersistentDrawerLeft changePage = {this.changePage}/>
          </BrowserRouter>
      </div>
    );
  }
}
