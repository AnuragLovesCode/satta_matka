// src/reducers/authReducer.ts

import { AuthActionTypes, LOGIN_SUCCESS, LOGIN_FAILURE } from '../actions/authActions';

interface AuthState {
  isLoggedIn: boolean;
  username: string | null;
  error: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  username: null,
  error: null,
};

const authReducer = (state = initialState, action: AuthActionTypes): AuthState => {
  // Reducer logic
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        username: action.payload.username,
        error: null,
      };
    case LOGIN_FAILURE:      
      return {
        ...state,
        isLoggedIn: false,
        username: null,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default authReducer;





