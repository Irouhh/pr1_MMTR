import { configureStore } from '@reduxjs/toolkit';

import { userReducer } from '../../entities/user/slice';

export const store = configureStore({
    reducer: {
        user: userReducer
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['user/loginUser/pending'],
            },
        }),
    devTools: true
})

export default store;