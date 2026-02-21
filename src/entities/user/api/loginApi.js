import { createAsyncThunk } from '@reduxjs/toolkit';

import { api } from '../../../shared/api/mainApi';

export const loginUser = createAsyncThunk ('sliceUser/loginUser',
    async ({email, password}, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;

    try {
        const response = await api.post('/auth/login', { email, password });

        return response.data;

    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Ошибка');
    }
});