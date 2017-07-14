import {combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form'
import {rootReducer} from './reducers/root'
import {loginReducer} from './reducers/login'
import {menuReducer} from './reducers/sidemenu'
import {petForm} from './reducers/form'
import {detailReducer} from './reducers/detail'
import {walkingReducer} from './reducers/walking'
import {archivesReducer} from './reducers/archives'
import {markingReducer} from './reducers/marking'
// ... other reducers

export default combineReducers({
  form: formReducer,
  root: rootReducer,
  login: loginReducer,
  menu: menuReducer,
  petForm: petForm,
  detail: detailReducer,
  walking: walkingReducer,
  archives: archivesReducer,
  marking: markingReducer,
  // ... other reducers
});
