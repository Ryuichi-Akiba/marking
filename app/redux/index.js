import {combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form'
import {reducer as routeReducer} from './routes'
import {home} from './reducers/home'
import {myPets} from './reducers/myPets'
import {addMyPetForm} from './reducers/addMyPetForm'
import {markingMap} from './reducers/markingMap'
// ... other reducers

export default combineReducers({
  form: formReducer,
  route: routeReducer,
  home,
  myPets,
  addMyPetForm,
  markingMap,
  // ... other reducers
});
