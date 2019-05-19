import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

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
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <div>{mess}</div>
        </header>
      </div>
    );
  }
}
