import {GraphRequest, GraphRequestManager} from 'react-native-fbsdk';

// -------------------- ActionCreator の定義 --------------------
const LOGIN_WITH_FACEBOOK = 'LOGIN_WITH_FACEBOOK';
function onLoginFinished(error,result){
  var getUserFromFB = () => {
    const infoRequest = new GraphRequest(
      '/me?fields=id,name,first_name,last_name,email,gender,picture.width(350).height(350)',
      null,
      (error, result) => {
        if (error) {
          console.log('Error fetching data: ' + error.toString());
        } else {
          console.log('Success fetching data: ' + JSON.stringify(result));
        }
      },
    );

    // Start the graph request.
    new GraphRequestManager().addRequest(infoRequest).start();
  }

  // this.setState({loading: false});
  if (error) {
    alert('Error logging in.');
  } else {
    if (result.isCanceled) {
      alert('Login cancelled.');
    } else {
      console.log(JSON.stringify(result));
      getUserFromFB();
    }
  }
}

export const ON_LOGIN = 'ON_LOGIN';
export function onLogin(results) {
  console.log('success');
  console.log(results);
  return {
    type: ON_LOGIN,
    payload: {isLogin: true},
    meta: {
      results
    },
    error: false
  }
}
export function onCancel(results) {
  console.log('cancel!!');
  console.log(results);
}
export function onError(error) {
  console.log(error);
}

export const ON_LOGOUT = 'ON_LOGOUT';
export function onLogout() {
  console.log('onLogout');
  return {
    type: ON_LOGOUT,
    payload: {isLogin: false},
    meta: {
    },
    error: false
  }
}

export function loginWithFacebook() {
  var getUserFromFB = () => {
    const infoRequest = new GraphRequest(
      '/me?fields=id,name,first_name,last_name,email,gender,picture.width(350).height(350)',
      null,
      (error, result) => {
        if (error) {
          console.log('Error fetching data: ' + error.toString());
        } else {
          console.log('Success fetching data: ' + JSON.stringify(result));
        }
      },
    );

    // Start the graph request.
    new GraphRequestManager().addRequest(infoRequest).start();
  }

  // this.setState({loading: false});
  if (error) {
    alert('Error logging in.');
  } else {
    if (result.isCanceled) {
      alert('Login cancelled.');
    } else {
      console.log(JSON.stringify(result));
      getUserFromFB();
    }
  }

  return {
    type: LOGIN_WITH_FACEBOOK,
    payload: {},
    meta: {},
    error: false
  }
}

const LOGIN_WITH_GOOGLE = 'LOGIN_WITH_GOOGLE';
export function loginWithGoogle() {
  return {
    type: LOGIN_WITH_GOOGLE,
    payload: {},
    meta: {},
    error: false
  }
}

// -------------------- Reducer の定義 --------------------
const initialState = {
  token: {
    isLogin: false
  }
}

export function home(state = initialState, action) {
  switch (action.type) {
    // ログイン成功時のステート変更処理
    case ON_LOGIN:
      var o = Object.assign({}, state);
      o.token = action.payload;
      return o;

    // ログアウト成功時のステート変更処理
    case ON_LOGOUT:
      var o = Object.assign({}, state);
      o.token = action.payload;
      return o;

    case LOGIN_WITH_FACEBOOK:
      console.log(action);
    default:
      return state;
  }
}
