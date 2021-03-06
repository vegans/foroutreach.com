import React from 'react'
import ReactDOM from 'react-dom'
import {MuiThemeProvider} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import theme from './theme'
import ReactGA from 'react-ga'
import {State} from './state'

ReactGA.initialize('UA-138880673-1')
ReactGA.pageview('/')

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <State>
      <CssBaseline />
      <App />
    </State>
  </MuiThemeProvider>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
