import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ChannelContainer from './components/ChannelContainer';
import Header from './components/Header';
import Home from "./components/Home";
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <section className="page-container">
          <div className="content-container">
            <Header />
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/channels/:channelId">
                <ChannelContainer />
              </Route>
            </Switch>
          </div>
          <p className="made-by">
            Made by{' '}
            <a
              href="https://github.com/zackharley"
              target="_blank"
              rel="noopener noreferrer"
            >
              Zack Harley
            </a>
          </p>
        </section>
      </div>
    </Router>
  );
}

export default App;
