import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Settings from './pages/Settings';
import GameScreen from './pages/GameScreen';
import FeedBack from './pages/FeedBack';
import Ranking from './pages/Ranking';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/settings" component={ Settings } />
        <Route exact path="/game" component={ GameScreen } />
        <Route exact path="/feedback" component={ FeedBack } />
        <Route exact path="/ranking" component={ Ranking } />
      </Switch>
    </div>
  );
}
