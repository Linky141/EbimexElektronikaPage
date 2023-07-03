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
        },
        addService: (state, action) => {
            const { service } = action.payload;
            if(service === undefined)
            return;
            state.service?.push(service);
        },
        removeService: (state, action) => {
            const { Id } = action.payload;
            const serviceIndex = state.service?.findIndex(i => i.id === Id);
            if (Id === -1 || serviceIndex === undefined)
                return;
            state.service?.splice(serviceIndex, 1);
        }
    }
})

export const { setServices, removeService, addService } = serviceSlice.actions;