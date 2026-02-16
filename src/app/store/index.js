import { configureStore } from '@reduxjs/toolkit';

import { userReducer } from '../../entities/user/slice';
import { boardReducer } from '../../entities/boards/slice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        board: boardReducer
    },
    devTools: true
})

export default store;