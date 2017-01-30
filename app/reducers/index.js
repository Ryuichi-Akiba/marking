import {combineReducers} from "redux";
import {reducer} from "./routes";
import {home} from './home';
// ... other reducers

export default combineReducers({
  home,
  reducer,
  // ... other reducers
});
