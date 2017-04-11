import {combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form'
import {reducer as routeReducer} from './routes'
import {rootReducer} from './reducers/root'
import {commonReducer} from './reducers/common'
import {loginReducer} from './reducers/login'
import {menuReducer} from './reducers/sidemenu'
import {addMyPetForm} from './reducers/addMyPetForm'
import {petDetailReducer} from './reducers/petDetail'
import {markingMap} from './reducers/markingMap'
// ... other reducers

export default combineReducers({
  form: formReducer,
  root: rootReducer,
  common: commonReducer,
  route: routeReducer,
  login: loginReducer,
  menu: menuReducer,
  addMyPetForm,
  petDetail: petDetailReducer,
  markingMap,
  // ... other reducers
});
