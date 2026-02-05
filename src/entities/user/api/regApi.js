import { createAsyncThunk } from '@reduxjs/toolkit';

import { api } from '../../../shared/api/mainApi';

export const registerUser = createAsyncThunk ('sliceUser/registerUser',
    async ({name, email, password}, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;

    try {
        const response = await api.post('/auth/registration', {name, email, password});

        return response.data;

    } catch (error) {
        if (error.response) {
            if (error.response.status === 400) {
                return rejectWithValue('Пароль должен содержать минимум 4 символа, включая буквы и цифры');
            }
            
            if (error.response.status === 409) {
                return rejectWithValue('Email уже занят');
            }
        }
        
        return rejectWithValue('Не удалось зарегистрироваться');
    }
})