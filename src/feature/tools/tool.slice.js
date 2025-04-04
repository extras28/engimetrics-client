import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toolApi from '../../api/tool.api';
import AppData from '../../shared/constant/AppData';

// MARK: --- thunks ---
export const thunkGetListTool = createAsyncThunk('tool/list', async (params, thunkApi) => {
    const res = await toolApi.getListTool(params);
    return res;
});

const toolSlice = createSlice({
    name: 'tool',
    initialState: {
        tools: [],
        isGettingTools: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        //get list tool
        builder.addCase(thunkGetListTool.pending, (state, action) => {
            state.isGettingTools = true;
        });
        builder.addCase(thunkGetListTool.rejected, (state, action) => {
            state.isGettingTools = false;
        });
        builder.addCase(thunkGetListTool.fulfilled, (state, action) => {
            state.isGettingTools = false;
            const { result, tools } = action.payload;
            if (result == AppData.responseResult.SUCCESS) {
                state.tools = tools;
            }
        });
    },
});

const { reducer, actions } = toolSlice;

export const {} = actions;
export default reducer;
