import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import { ExchangeProvider } from "./Context/ExchangeContext";

import './style.css'
import Home from './views/home'

const App = () => {
  return (
    <ExchangeProvider>
    <Router>
      <Switch>
        <Route component={Home} exact path="/" />
      </Switch>
    </Router>
    </ExchangeProvider>

  )
}

ReactDOM.render(<App />, document.getElementById('app'))
