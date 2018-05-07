import reducers from '../reducers/message'
import effects from '../effects/message'

const initialState = {
  charCount:     0,
  messageCount:  1,
  content:       "",
  sending:       false,
}

const message = {
  state:    initialState,
  reducers: reducers,
  effects:  effects,
}

export default message
