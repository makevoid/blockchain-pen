import { init } from '@rematch/core'
import { routerReducer } from 'react-router-redux'
import count from './models/count'
import keychain from './models/keychain'
import message from './models/message'

// import { routerReducer, routerMiddleware } from 'react-router-redux'
// import createHistory from 'history/createBrowserHistory'
// const browserHistory = createHistory()
// const middlewares = [routerMiddleware(browserHistory)]

const store = init({
  models: {
    count,
    keychain,
    message,
  },
  redux: {
    reducers: {
      router: routerReducer,
    }
  }
})

export default store
