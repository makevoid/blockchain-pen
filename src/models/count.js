import reducers from '../reducers/count'
import effects from '../effects/count'

const count = {
  state: 0, // initial state
  reducers: reducers,
  effects:  effects,
}

export default count
