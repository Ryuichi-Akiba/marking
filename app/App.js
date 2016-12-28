import React from "react";
import {createStore, applyMiddleware, compose} from "redux";
import {Provider} from "react-redux";
import reducers from "./reducers";
import AppRouter from "./AppRouter";

// ReduxとRouterのインテグレーション
const middleware = [/* ...your middleware (i.e. thunk) */];
const store = compose(applyMiddleware(...middleware))(createStore)(reducers);

// アプリケーションのベース設定
export default class App extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <Provider store={store}>
        <AppRouter/>
      </Provider>
    )
  }
};
