export const localStorageMiddleware = (store) => (next) => (action) => {
  if (action.type === "authentication/setLoggedIn") {
    localStorage.setItem("isLoggedIn", "true");
  } else if (action.type === "authentication/setLoggedOut") {
    localStorage.removeItem("isLoggedIn");
  }

  return next(action);
};
