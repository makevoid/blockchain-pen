import reducers from '../reducers/counters'
import effects from '../effects/counters'

const initialState = {
  chars: 0,
  messages: 1,
}

const counters = {
  state:    initialState,
  reducers: reducers,
  effects:  effects,
}

export default counters
