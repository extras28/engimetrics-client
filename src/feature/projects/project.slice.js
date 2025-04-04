import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import projectApi from '../../api/project.api';
import AppData from '../../shared/constant/AppData';
import Global from '../../shared/utils/Global';

// MARK: --- thunks ---
export const thunkGetListProject = createAsyncThunk('project/list', async (params, thunkApi) => {
    const res = await projectApi.list(params);
    return res;
});

export const thunkReviewProject = createAsyncThunk('project/check', async (params, thunkApi) => {
    const res = await projectApi.review(params);
    return res;
});

const projectSlice = createSlice({
    name: 'project',
    initialState: {
        projects: [],
        isGettingProjects: false,
        pagination: { perPage: Global.gDefaultPagination },

        analytics: {},
        analysing: false,
    },
    reducers: {
        setPaginationPerPage: (state, action) => {
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    perPage: action.payload,
                },
            };
        },
    },
    extraReducers: (builder) => {
        //get list project
        builder.addCase(thunkGetListProject.pending, (state, action) => {
            state.isGettingProjects = true;
        });
        builder.addCase(thunkGetListProject.rejected, (state, action) => {
            state.isGettingProjects = false;
        });
        builder.addCase(thunkGetListProject.fulfilled, (state, action) => {
            state.isGettingProjects = false;
            const { result, projects, total, count, page } = action.payload;
            if (result == AppData.responseResult.SUCCESS) {
                state.projects = projects;
                state.pagination = {
                    ...state.pagination,
                    total: total,
                    count: count,
                    currentPage: page + 1,
                };
            }
        });
        //review source code
        builder.addCase(thunkReviewProject.pending, (state, action) => {
            state.analysing = true;
        });
        builder.addCase(thunkReviewProject.rejected, (state, action) => {
            state.analysing = false;
        });
        builder.addCase(thunkReviewProject.fulfilled, (state, action) => {
            state.analysing = false;
            const { result, analytics } = action.payload;
            if (result == AppData.responseResult.SUCCESS) {
                state.analytics = analytics;
            }
        });
    },
});

const { reducer, actions } = projectSlice;

export const {} = actions;
export default reducer;
