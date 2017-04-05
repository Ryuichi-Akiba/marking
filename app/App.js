import React from 'react'
import {createStore, applyMiddleware, compose} from 'redux'
import {Provider} from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import createLogger  from 'redux-logger'
import reducers from './redux'
import sagas from './redux/sagas'
import RootScene from './containers/RootScene'

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
// create redux logger middleware
const loggerMiddleware = createLogger();

// create store with middleware
const middleware = [sagaMiddleware, loggerMiddleware];
const store = compose(
  applyMiddleware(...middleware),
  // autoRehydrate()
)(createStore)(reducers);

// begin periodically persisting the store
// persistStore(store, {storage: AsyncStorage})
// run the saga
sagaMiddleware.run(sagas);

// アプリケーションのベース設定
export default class App extends React.PureComponent {
  render() {
    return (
      <Provider store={store}>
        <RootScene/>
      </Provider>
    )
  }
}
