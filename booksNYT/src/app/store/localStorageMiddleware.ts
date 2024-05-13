import type { Middleware, Dispatch } from 'redux';
import type { RootState } from './store';

interface Action {
  type: string;
  payload?: any;
}

function isAction(value: unknown): value is Action {
  return typeof value === 'object' && value !== null;
}

export const localStorageMiddleware: Middleware<{}, RootState, Dispatch<Action>> = (store) => (next) => (action) => {
  if (isAction(action)) {
    if (action.type === "authentication/setLoggedIn") {
      localStorage.setItem("isLoggedIn", "true")
    } else if (action.type === "authentication/setLoggedOut") {
      localStorage.removeItem("isLoggedIn");
    }
  }

  return next(action);
};
