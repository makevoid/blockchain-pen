import reducers from '../reducers/count'
import effects from '../effects/count'

const initialState = 0

const count = {
  state:    initialState,
  reducers: reducers,
  effects:  effects,
}

export default count
