import {combineReducers} from "redux";
import {reducer} from "./routes";
import {home} from './reducers/home';
import {myPets} from './reducers/myPets';
import {markingMap} from './reducers/markingMap'
// ... other reducers

export default combineReducers({
  home,
  myPets,
  markingMap,
  reducer,
  // ... other reducers
});
