import {combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form'
import {reducer as routeReducer} from './routes'
import {commonReducer} from './reducers/common'
import {home} from './reducers/home'
import {menuReducer} from './reducers/sidemenu'
import {addMyPetForm} from './reducers/addMyPetForm'
import {markingMap} from './reducers/markingMap'
// ... other reducers

export default combineReducers({
  form: formReducer,
  common: commonReducer,
  route: routeReducer,
  home,
  menu: menuReducer,
  addMyPetForm,
  markingMap,
  // ... other reducers
});
