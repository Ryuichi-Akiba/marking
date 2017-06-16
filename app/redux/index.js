import {combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form'
import {rootReducer} from './reducers/root'
import {loginReducer} from './reducers/login'
import {menuReducer} from './reducers/sidemenu'
import {addMyPetForm} from './reducers/addMyPetForm'
import {detailReducer} from './reducers/detail'
import {graphReducer} from './reducers/graph'
import {walkingReducer} from './reducers/walking'
import {archivesReducer} from './reducers/archives'
// ... other reducers

export default combineReducers({
  form: formReducer,
  root: rootReducer,
  login: loginReducer,
  menu: menuReducer,
  addMyPetForm,
  detail: detailReducer,
  graph: graphReducer,
  walking: walkingReducer,
  archives: archivesReducer,
  // ... other reducers
});
