import { createSlice } from '@reduxjs/toolkit';

import { loginUser } from '../api/loginApi';
import { registerUser } from '../api/regApi';

const initialState = {
    token: localStorage.getItem('token'),
    error: null,
    name: localStorage.getItem('userName')
}

const sliceUser = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null;
            state.name = null;
            localStorage.removeItem('token');
            localStorage.removeItem('userName');
        }
    },

extraReducers: (builder) => {
    builder 
    .addCase(loginUser.pending, (state) => {
        state.error = null;
    })
    .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.name = action.payload.name;
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('userName', action.payload.name);
    })
    .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
    })
    .addCase(registerUser.pending, (state) => {
        state.error = null;
    })
    .addCase(registerUser.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.name = action.payload.name;
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('userName', action.payload.name);
    })
    .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;
    });
}

})

export const {actions: userActions} = sliceUser;
export const userReducer = sliceUser.reducer;
export default sliceUser.reducer;