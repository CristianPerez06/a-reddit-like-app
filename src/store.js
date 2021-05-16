import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import appReducer from './reducers'

const middleware = [thunk]

export default createStore(
  appReducer,
  composeWithDevTools(applyMiddleware(...middleware))
)
