import { configureStore } from '@reduxjs/toolkit';
import { booksAPI } from '../api';
import userReducer from './slices/userSlice';
import { favoritesReducer } from './slices/favoritesSlice';
import searchReducer from './slices/searchSlice';

export const store = configureStore({
    reducer: {
        [booksAPI.reducerPath]: booksAPI.reducer,
        user: userReducer,
        favorites: favoritesReducer,
        search: searchReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(booksAPI.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
