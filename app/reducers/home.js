

// -------------------- ActionCreator の定義 --------------------
const LOGIN_WITH_FACEBOOK = 'LOGIN_WITH_FACEBOOK';
export function loginWithFacebook() {
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
}

export function home(state = initialState, action) {
  switch (action.type) {
    case LOGIN_WITH_FACEBOOK:
      console.log(action);
    default:
      return state;
  }
}
