import { configureStore } from '@reduxjs/toolkit';
import { booksAPI } from '../api';
import userReducer from './slices/userSlice';
import searchReducer from './slices/searchSlice';

export const store = configureStore({
    reducer: {
        [booksAPI.reducerPath]: booksAPI.reducer,
        user: userReducer,
        search: searchReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(booksAPI.middleware),
});

export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
