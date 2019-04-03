import React, { Component } from 'react';
import './App.css';
import Reader from './components/Reader'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2 className="mainTitle">Human IT News</h2>
        </header>
        <Reader />
      </div>
    );
  }
}

export default App;
