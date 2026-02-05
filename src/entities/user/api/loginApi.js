import { createAsyncThunk } from '@reduxjs/toolkit';

import { api } from '../../../shared/api/mainApi';

export const loginUser = createAsyncThunk ('sliceUser/loginUser',
    async ({email, password}, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;

    try {
        const response = await api.post('/auth/login', { email, password });

        return response.data;

    } catch (error) {
        if (error.response) {
            if (error.response.status === 400) {
                return rejectWithValue('Некорректный email или пароль (содержит от 4 до 16 символов)');
            }
            
            if (error.response.status === 401) {
                return rejectWithValue('Неверный email или пароль');
            }
        }
        
        return rejectWithValue('Не удалось авторизоваться');
    }
});