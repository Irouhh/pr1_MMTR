import { createSlice } from '@reduxjs/toolkit';

import { createBoard, deleteBoard, editBoard, getBoards } from '../api/boardsApi';

const initialState = {
    error: null,
    boards: [],
    message: null
}

const sliceBoards = createSlice({
    name: 'boards',
    initialState,
    reducers: {
        logout: (state) => {
            state.name = null;
            state.boards = [];
        }
    },

extraReducers: (builder) => {
    builder 
    .addCase(createBoard.pending, (state) => {
        state.error = null;
    })
    .addCase(createBoard.fulfilled, (state, action) => {
        state.message = action.payload.message;
    })
    .addCase(createBoard.rejected, (state, action) => {
        state.error = action.payload;
    })

    .addCase(deleteBoard.pending, (state) => {
        state.error = null;
    })
    .addCase(deleteBoard.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.boards = state.boards.filter(board => (board.id !== action.payload.boardId))
    })
    .addCase(deleteBoard.rejected, (state, action) => {
        state.error = action.payload;
    })

    .addCase(editBoard.pending, (state) => {
        state.error = null;
    })
    .addCase(editBoard.fulfilled, (state, action) => {
        state.message = action.payload.message;
    })
    .addCase(editBoard.rejected, (state, action) => {
        state.error = action.payload;
    })

    .addCase(getBoards.pending, (state) => {
        state.error = null;
    })
    .addCase(getBoards.fulfilled, (state, action) => {
        state.boards = action.payload;
    })
    .addCase(getBoards.rejected, (state, action) => {
        state.error = action.payload;
    });
}});

export const {actions: boardActions} = sliceBoards;
export const boardReducer = sliceBoards.reducer;
export default sliceBoards.reducer;