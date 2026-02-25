import { createAsyncThunk } from '@reduxjs/toolkit';

import { api } from '../../../shared/api/mainApi';

export const createList = createAsyncThunk ('sliceList/createList',
    async ({ name, boardId }, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;

    try {
        const response = await api.post('/list/createList', { name, boardId});

        return {
            name, boardId, message: response.data.message
        };

    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Ошибка');
    }
});

export const deleteList = createAsyncThunk('sliceList/deleteList',
    async ({ boardId, listId }, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
    
    try {
        const response = await api.delete('/list/deleteList', { 
            params: { boardId, listId } 
        });

        return {
            boardId, listId, message: response.data.message
        };
        
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Ошибка');
    }
});

export const editList = createAsyncThunk('sliceList/editList',
    async ({ boardId, listId, name }, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
    
    try {
        const response = await api.put('/list/editList', { boardId, listId, name });
        
        return {
            boardId, listId, name, message: response.data.message
        };

    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Ошибка');
    }
});

export const getLists = createAsyncThunk('sliceList/getLists',
    async ({ boardId }, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        
    try {
        const response = await api.get('/list/list', { 
            params: { boardId }
        });
        
        return {
            boardId, lists: response.data
        }
        
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Ошибка');
    }
});