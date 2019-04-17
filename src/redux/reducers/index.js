import {loginReducer} from './loginPage'
import {registerReducer} from './registerPage'
import { combineReducers } from 'redux'
const rootReducer = combineReducers({
    register:registerReducer,
    login:loginReducer
  })
  
  export default rootReducer