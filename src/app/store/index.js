import { configureStore } from '@reduxjs/toolkit';

import { userReducer } from '../../entities/user/slice';
import { boardReducer } from '../../entities/boards/slice';
import { listReducer } from '../../entities/lists/slice';
import { taskReducer } from '../../entities/tasks/slice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        board: boardReducer,
        list: listReducer,
        task: taskReducer
    },
    devTools: true
})

export default store;