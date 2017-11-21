import React, { Component } from 'react';
import logo from './OITLogo2.png';
import { Link } from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Link to="/">
            <img className="App-logo" src={logo} alt="logo"/>
          </Link>
          <h1 className="App-title">Oscar_In_Tech</h1>
        </header>
        <div>
          {this.props.children}
        </div>
        <footer className="App-footer">Powered by <a href='https://buttercms.com/'>ButterCMS</a></footer>
      </div>
    );
  }
}

export default App;
