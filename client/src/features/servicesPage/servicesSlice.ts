import { createSlice } from "@reduxjs/toolkit";
import { Service } from "../../app/models/service";

interface ServiceState {
    service: Service[] | null;
}

const initialState: ServiceState = {
    service: null,
}

export const serviceSlice = createSlice({
    name: 'services',
    initialState,
    reducers: {
        setServices: (state, action) => {
            state.service = action.payload
        }
    }
})

export const { setServices } = serviceSlice.actions;