import React from 'react';
import { Switch, Route, BrowserRouter } from "react-router-dom";
import "./App.scss";
import Home from "./home/home";
import CreateNote from './createNote/createNote';

export default class App extends React.Component {

  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
              <Route path="/" component={Home} exact/>
              <Route path="/create/note" component={CreateNote} exact/>
              <Route path="/" component={Home} exact/>
              <Route component={Home}/>
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}
