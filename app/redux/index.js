import {combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form'
import {rootReducer} from './reducers/root'
import {commonReducer} from './reducers/common'
import {loginReducer} from './reducers/login'
import {menuReducer} from './reducers/sidemenu'
import {addMyPetForm} from './reducers/addMyPetForm'
import {detailReducer} from './reducers/detail'
import {markingMap} from './reducers/markingMap'
import {archivesReducer} from './reducers/archives'
// ... other reducers

export default combineReducers({
  form: formReducer,
  root: rootReducer,
  common: commonReducer,
  login: loginReducer,
  menu: menuReducer,
  addMyPetForm,
  detail: detailReducer,
  markingMap,
  archives: archivesReducer,
  // ... other reducers
});
