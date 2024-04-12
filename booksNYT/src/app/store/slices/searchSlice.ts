import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from "@reduxjs/toolkit";

interface HistoryState {
    query: string
}

const initialState: HistoryState = {
    query: '',
};

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setQuery: (state, action: PayloadAction<string>) => {
            state.query = action.payload;
        },
    },
});

export const { setQuery } = searchSlice.actions;
export const selectQuery = (state: { search: { query: string; }; }) => state.search.query;
export const selectHistory = (state: { search: { history: string; }; }) => state.search.history;
export default searchSlice.reducer;
