import { createSlice } from '@reduxjs/toolkit';

import { createTask, deleteTask, editTask, getTasks } from '../api/tasksApi';

const initialState = {
    error: null,
    tasks: [],
    message: null
}

const sliceTasks = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        logout: (state) => {
            state.name = null;
            state.tasks = [];
        }
    },

extraReducers: (builder) => {
    builder 
    .addCase(createTask.pending, (state) => {
        state.error = null;
    })
    .addCase(createTask.fulfilled, (state, action) => {
        state.message = action.payload.message;
    })
    .addCase(createTask.rejected, (state, action) => {
        state.error = action.payload;
    })

    .addCase(deleteTask.pending, (state) => {
        state.error = null;
    })
    .addCase(deleteTask.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.tasks = state.tasks.filter(task => (task.id !== action.payload.taskId))
    })
    .addCase(deleteTask.rejected, (state, action) => {
        state.error = action.payload;
    })

    .addCase(editTask.pending, (state) => {
        state.error = null;
    })
    .addCase(editTask.fulfilled, (state, action) => {
        state.message = action.payload.message;
    })
    .addCase(editTask.rejected, (state, action) => {
        state.error = action.payload;
    })

    .addCase(getTasks.pending, (state) => {
        state.error = null;
    })
    .addCase(getTasks.fulfilled, (state, action) => {
        const someTasks = state.tasks.filter(task => task.listId !== action.payload.listId);
    
        state.tasks = [...someTasks, ...action.payload.tasks];
    })
    .addCase(getTasks.rejected, (state, action) => {
        state.error = action.payload;
    });
}});

export const {actions: taskActions} = sliceTasks;
export const taskReducer = sliceTasks.reducer;
export default sliceTasks.reducer;