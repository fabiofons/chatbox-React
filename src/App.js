import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import Login from './Login';
import Chat from './Chat'


class App extends React.Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={Login} />
        <Route path="/chat" component={Chat} />
      </Router>
    );
  }
}
export default App;
