import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const FAV_KEY = 'favorite'

interface favoritesState {
    favorites: string[]
}

const storeFavoriteState = () => {
    try {
        const serializedState = localStorage.getItem(FAV_KEY);
        if (serializedState === null) {
            return [];
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return [];
    }
};

const initialState: favoritesState = {
    favorites: storeFavoriteState()
}

export const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addFavorite(state, action: PayloadAction<string>) {
            state.favorites?.push(action.payload);
            localStorage.setItem(FAV_KEY, JSON.stringify(state.favorites));
        },
        removeFavorite(state, action: PayloadAction<string>) {
            state.favorites = state.favorites.filter(f => f !== action.payload);
            localStorage.setItem(FAV_KEY, JSON.stringify(state.favorites));
        }
    }
})

export const favoritesActions = favoritesSlice.actions
export const favoritesReducer = favoritesSlice.reducer