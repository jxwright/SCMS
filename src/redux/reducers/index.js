import {postsBySubreddit,selectedSubreddit} from './loginPage'
import { combineReducers } from 'redux'
const rootReducer = combineReducers({
    postsBySubreddit,
    selectedSubreddit
  })
  
  export default rootReducer