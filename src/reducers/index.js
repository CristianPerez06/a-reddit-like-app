import { combineReducers } from 'redux'
import posts from './postReducer'

// to combine all reducers together
const appReducer = combineReducers({
  posts
})

export default appReducer
