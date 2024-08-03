// src/actions/authActions.ts

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: { username: string };
}

interface LoginFailureAction {
  type: typeof LOGIN_FAILURE;
  payload: { error: string };
}

export type AuthActionTypes = LoginSuccessAction | LoginFailureAction;

export const loginSuccess = (username: string): AuthActionTypes => ({
  type: LOGIN_SUCCESS,
  payload: { username },
});

export const loginFailure = (error: string): AuthActionTypes => ({
  type: LOGIN_FAILURE,
  payload: { error },
});
