import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from "@reduxjs/toolkit";

const HISTORY_KEY = 'history.'

interface HistoryState {
    query: string
    history: string[]
}

const storeHistoryState = () => {
    try {
        const serializedState = localStorage.getItem(HISTORY_KEY);
        if (serializedState === null) {
            return [];
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return [];
    }
};

const saveState = (state: string[]) => {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(HISTORY_KEY, serializedState);
};

const initialState: HistoryState = {
    query: '',
    history: storeHistoryState(),
};

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setQuery: (state, action: PayloadAction<string>) => {
            state.query = action.payload;
        },
        addToHistory: (state, action: PayloadAction<string>) => {
            state.history = [action.payload, ...state.history];
            saveState(state.history);
        },
    },
});

export const { setQuery, addToHistory } = searchSlice.actions;
export default searchSlice.reducer;
