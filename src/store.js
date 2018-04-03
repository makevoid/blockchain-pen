import { init } from '@rematch/core'
import { routerReducer } from 'react-router-redux'
import count from './models/count'

// import { routerReducer, routerMiddleware } from 'react-router-redux'
// import createHistory from 'history/createBrowserHistory'
// const browserHistory = createHistory()
// const middlewares = [routerMiddleware(browserHistory)]

const store = init({
  models: {
    count,
  },
  redux: {
    reducers: {
      router: routerReducer,
    }
  }
})

export default store
