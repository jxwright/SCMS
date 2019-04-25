import {loginReducer} from './pages/UserLogin/reducer'
//import {registerReducer} from './redux/reducers/registerPage'
import {exampleReducer} from './pages/CameraManagement/reducer'
import { combineReducers } from 'redux'
const rootReducer = combineReducers({
  //  register:registerReducer,
    login:loginReducer,
    camera:exampleReducer
  })
  
  export default rootReducer