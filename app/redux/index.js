import {combineReducers} from "redux";
import {reducer} from "./routes";
import {home} from './reducers/home';
// ... other reducers

export default combineReducers({
  home,
  reducer,
  // ... other reducers
});
