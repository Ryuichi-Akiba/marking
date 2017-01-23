import {combineReducers} from "redux";
import routes from "./routes";
import {home} from './home';
// ... other reducers

export default combineReducers({
  home,
  routes,
  // ... other reducers
});
