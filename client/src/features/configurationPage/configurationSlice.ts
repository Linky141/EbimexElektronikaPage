import { createSlice } from "@reduxjs/toolkit";
import { Configuration } from "../../app/models/configuration";

interface ConfigurationState {
    configuration: Configuration[] | null
}

const initialState: ConfigurationState = {
    configuration: null
}

export const configurationSlice = createSlice({
    name: 'configurations',
    initialState,
    reducers: {
        setConfiguration: (state, action) => {
            state.configuration = action.payload
        }
    }
})

export const { setConfiguration } = configurationSlice.actions;