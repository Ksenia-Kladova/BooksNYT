import { configureStore } from '@reduxjs/toolkit';
import { booksAPI } from '../api';
import userReducer from './slices/userSlice';

export const store = configureStore({
    reducer: {
        [booksAPI.reducerPath]: booksAPI.reducer,
        user: userReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(booksAPI.middleware),

});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
