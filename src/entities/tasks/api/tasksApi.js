import { createAsyncThunk } from '@reduxjs/toolkit';

import { api } from '../../../shared/api/mainApi';

export const createTask = createAsyncThunk ('sliceTasks/createTask',
    async ({ name, listId, boardId }, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;

    try {
        const response = await api.post('/task/createTask', { name, listId});

        return {
            name, listId, boardId, message: response.data.message
        };

    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Ошибка');
    }
});

export const deleteTask = createAsyncThunk('sliceTasks/deleteTask',
    async ({ boardId, listId, taskId }, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
    
    try {
        const response = await api.delete('/task/deleteTask', { 
            params: { boardId, listId, taskId } 
        });

        return {
            boardId, listId, taskId, message: response.data.message
        };
        
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Ошибка');
    }
});

export const editTask = createAsyncThunk('sliceTasks/editTask',
    async ({ boardId, listId, name, taskId, isActive }, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
    
    try {
        const response = await api.put('/task/editTask', { boardId, listId, name, taskId, isActive });
        
        return {
            boardId, listId, taskId, name, message: response.data.message, isActive
        };

    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Ошибка');
    }
});

export const getTasks = createAsyncThunk('sliceTasks/getTasks',
    async ({ boardId, listId }, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        
    try {
        const response = await api.get('/task/task', { 
            params: { boardId, listId }
        });
        
        return {
            boardId, tasks: response.data, listId
        }
        
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Ошибка');
    }
});