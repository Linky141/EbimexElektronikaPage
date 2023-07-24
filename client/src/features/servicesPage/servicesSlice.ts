import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { Service } from "../../app/models/service";
import agent from "../../app/api/agent";
import { RootState } from "../../app/service/configureService";

interface ServiceState {
    services: Service[] | null;
    status: string;
}

const initialState: ServiceState = {
    services: null,
    status: 'idle'
}

export const fetchServicesAsync = createAsyncThunk<Service[]>(
    'services/fetchServicesAsync',
    async (_, thunkAPI) => {
        try {
            const state = thunkAPI.getState() as RootState;
            const services = await agent.Service.GetServices(state.account.user?.email!);
            return services;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
)

export const removeServiceAsync = createAsyncThunk<void, { id: number, name?: string}>(
    'services/removeServiceAsync',
    async ({id}, thunkAPI) => {
        try {
            agent.Service.removeService(id);            
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
)










export const serviceSlice = createSlice({
    name: 'services',
    initialState,
    reducers: {
        setServices: (state, action) => {
            state.services = action.payload
        },
        addService: (state, action) => {
            const { service } = action.payload;
            if (service === undefined)
                return;
            state.services?.push(service);
        }
    },
    extraReducers: (builder => {
        builder.addCase(removeServiceAsync.pending, (state, action) => {
            state.status = 'pendingRemoveItem' + action.meta.arg.id + action.meta.arg.name;
        });
        builder.addCase(removeServiceAsync.fulfilled, (state, action) => {
            const Id = action.meta.arg.id;
            const serviceIndex = state.services?.findIndex(i => i.id === Id);
            if (Id === -1 || serviceIndex === undefined)
                return;
            state.services?.splice(serviceIndex, 1);
            state.status = 'idle';
        });
        builder.addCase(removeServiceAsync.rejected, (state, action) => {
            state.status = 'idle';
            console.log(action.payload);
        });
        // builder.addMatcher(isAnyOf(fetchServicesAsync.pending), (state, action) => {
        //     state.status = 'pendingServices';
        // });
        builder.addMatcher(isAnyOf(fetchServicesAsync.fulfilled), (state, action) => {
            state.services = action.payload;
            state.status = 'idle';
        });
        builder.addMatcher(isAnyOf(fetchServicesAsync.rejected), (state, action) => {
            state.status = 'idle';
            console.log(action.payload);
        });

    })
})

export const { setServices, addService } = serviceSlice.actions;