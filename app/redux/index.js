import {combineReducers} from "redux";
import {reducer} from "./routes";
import {home} from './reducers/home';
import {markingMap} from './reducers/markingMap'
// ... other reducers

export default combineReducers({
  home,
  markingMap,
  reducer,
  // ... other reducers
});
