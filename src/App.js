import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Settings from './components/Settings';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/settings" component={ Settings } />
      </Switch>
    </div>
  );
}
