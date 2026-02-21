import { createAsyncThunk } from '@reduxjs/toolkit';

import { api } from '../../../shared/api/mainApi';

export const createBoard = createAsyncThunk ('sliceBoards/createBoard',
    async ({ name }, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;

    try {
        const response = await api.post('/board/createBoard', { name });

        return {
            name, message: response.data.message
        };

    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Ошибка');
    }
});

export const deleteBoard = createAsyncThunk('sliceBoards/deleteBoard',
    async (boardId, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
    
    try {
        const response = await api.delete('/board/deleteBoard', { 
            params: { boardId } 
        });

        return {
            boardId, message: response.data.message
        };
        
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Ошибка');
    }
});

export const editBoard = createAsyncThunk('sliceBoards/editBoard',
    async ({ id, name }, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
    
    try {
        const response = await api.put('/board/editBoard', { boardId: id, name });
        
        return {
            boardId: id, name, message: response.data.message
        };

    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Ошибка');
    }
});

export const getBoards = createAsyncThunk('sliceBoards/getBoards',
    async (_, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        
    try {
        const response = await api.get('/board/boards');
        
        return response.data;
        
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Ошибка');
    }
});