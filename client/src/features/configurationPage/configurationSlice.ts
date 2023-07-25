import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Configuration } from "../../app/models/configuration";
import agent from "../../app/api/agent";
import { FieldValues } from "react-hook-form";

interface ConfigurationState {
    configuration: Configuration | null;
    status: string;
}

const initialState: ConfigurationState = {
    configuration: null,
    status: 'idle'
}

export const fetchConfigurationAsync = createAsyncThunk<Configuration>(
    'infos/fetchConfigurationAsync',
    async (_, thunkAPI) => {
        try {
            const configurations = await agent.Configuration.get();
            return configurations[0];
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
)

export const updateConfigurationAsync = createAsyncThunk<void, FieldValues>(
    'infos/setConfigurationAsync',
    async (data, thunkAPI) => {
        try {
            data.id = 1;
            await agent.Configuration.post(data);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
)

export const configurationSlice = createSlice({
    name: 'configurations',
    initialState,
    reducers: {
        setConfiguration: (state, action) => {
            state.configuration = action.payload
        }
    },
    extraReducers: (builder => {
        builder.addCase(fetchConfigurationAsync.fulfilled, (state, action) => {
            state.configuration = action.payload;
            state.status = 'idle';
        });
        builder.addCase(fetchConfigurationAsync.rejected, (state, action) => {
            state.status = 'idle';
            console.log(action.payload);
        });
    })
})

export const { setConfiguration} = configurationSlice.actions;