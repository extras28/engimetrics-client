import { configureStore } from '@reduxjs/toolkit';
import toolReducer from '../feature/tools/tool.slice';
import projectReducer from '../feature/projects/project.slice';

const rootReducer = {
    tool: toolReducer,
    project: projectReducer,
};

const store = configureStore({
    reducer: rootReducer,
    devTools: import.meta.env.VITE_DEV_TOOLS === 'DEV' ? true : false,
});

export default store;
