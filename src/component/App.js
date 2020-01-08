import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from './header/header';
import Main from './main/main';
import Landing from './landingPage/landingPage';
import './App.css';

const App = () => (
    <Router>
      <Header />
      <Switch>
        <Route exact path='/' component={Landing}/>
        <Route path='/main' component={Main}/>
        <Route path='/landing' component={Landing}/>
      </Switch>
    </Router>
)

export default App;