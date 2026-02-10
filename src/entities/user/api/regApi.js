import { createAsyncThunk } from '@reduxjs/toolkit';

import { api } from '../../../shared/api/mainApi';

export const registerUser = createAsyncThunk ('sliceUser/registerUser',
    async ({name, email, password}, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;

    try {
        const response = await api.post('/auth/registration', {name, email, password});

        return response.data;

    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Ошибка');
    }
})