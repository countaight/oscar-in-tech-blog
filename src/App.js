import React, { Component } from 'react';
import logo from './OITLogo2.png';
import { Link } from 'react-router-dom';

import AnimatedHeader from './AnimatedHeader';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Link to="/">
            <img className="App-logo" src={logo} alt="logo"/>
          </Link>
          <h1 className="App-title"><AnimatedHeader/></h1>
        </header>
        <div className="main-content">
          {this.props.children}
        </div>
        <footer className="App-footer">Powered by <a href='https://buttercms.com/'>ButterCMS</a></footer>
      </div>
    );
  }
}

export default App;
