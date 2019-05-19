import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import PersistentDrawerLeft from './PersistentDrawerLeft.js';

export default class App extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      message: ''
    }

    this.getMessages = this.getMessages.bind(this)
  }

  getMessages() {
    axios
        .get("http://localhost:8080/test")
        .then((response) => {
          this.setState({
            message: response.data
          })
          this.$emit("success");
        })
        .catch(() => {
        });
  }
  componentWillMount() {
    this.getMessages();
  }
  render () {
    var mess = this.state.message;



    return (
      <div className="App">
          <PersistentDrawerLeft/>

      </div>
    );
  }
}
