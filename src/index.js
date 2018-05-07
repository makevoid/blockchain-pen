import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { Route } from 'react-router'
import browserHistory from './browserHistory'
import store from './store'
import Home from './comps/Home'

// blockchain-pen at the current stage doesn't really needs a router as it's really a single-page-app (has only one view :D)
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={browserHistory}>
      <App>
        <Route exact path="/" component={Home} />
      </App>
    </ConnectedRouter>
  </Provider>
  ,
  document.querySelector('#root')
)

registerServiceWorker()

;(async () => {
  await new Promise(resolve => setTimeout(resolve, 200))
  store.dispatch.keychain.initialize()
})()
