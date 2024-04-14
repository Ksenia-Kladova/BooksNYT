import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { booksAPI } from '../api';
import userReducer from './slices/userSlice';
import searchReducer from './slices/searchSlice';
import authenticationReducer from "./slices/authenticationSlice";
import { localStorageMiddleware } from "./localStorageMiddleware";

const rootReducer = combineReducers({
    [booksAPI.reducerPath]: booksAPI.reducer,
    user: userReducer,
    search: searchReducer,
    authentication: authenticationReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(booksAPI.middleware)
            .concat(localStorageMiddleware)
});

export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
