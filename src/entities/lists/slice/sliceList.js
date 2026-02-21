import { createSlice } from '@reduxjs/toolkit';

import { createList, deleteList, editList, getLists } from '../api/listsApi';

const initialState = {
    error: null,
    lists: [],
    message: null
}

const sliceList = createSlice({
    name: 'lists',
    initialState,
    reducers: {
        logout: (state) => {
            state.name = null;
            state.lists = [];
        }
    },

extraReducers: (builder) => {
    builder 
    .addCase(createList.pending, (state) => {
        state.error = null;
    })
    .addCase(createList.fulfilled, (state, action) => {
        state.message = action.payload.message;
    })
    .addCase(createList.rejected, (state, action) => {
        state.error = action.payload;
    })

    .addCase(deleteList.pending, (state) => {
        state.error = null;
    })
    .addCase(deleteList.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.lists = state.lists.filter(list => (list.id !== action.payload.listId))
    })
    .addCase(deleteList.rejected, (state, action) => {
        state.error = action.payload;
    })

    .addCase(editList.pending, (state) => {
        state.error = null;
    })
    .addCase(editList.fulfilled, (state, action) => {
        state.message = action.payload.message;
    })
    .addCase(editList.rejected, (state, action) => {
        state.error = action.payload;
    })

    .addCase(getLists.pending, (state) => {
        state.error = null;
    })
    .addCase(getLists.fulfilled, (state, action) => {
        state.lists = action.payload.lists;
    })
    .addCase(getLists.rejected, (state, action) => {
        state.error = action.payload;
    });
}});

export const {actions: listActions} = sliceList;
export const listReducer = sliceList.reducer;
export default sliceList.reducer;