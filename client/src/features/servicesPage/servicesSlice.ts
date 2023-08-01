import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { Service } from "../../app/models/service";
import agent from "../../app/api/agent";
import { RootState } from "../../app/service/configureService";
import { FieldValues } from "react-hook-form";

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
            if (services)
                return services;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
)

export const removeServiceAsync = createAsyncThunk<void, { id: number, name?: string }>(
    'services/removeServiceAsync',
    async ({ id }, thunkAPI) => {
        try {
            await agent.Service.removeService(id);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
)

export const addCommentAsync = createAsyncThunk<Service, FieldValues>(
    'services/addCommentAsync',
    async (data, thunkAPI) => {
        try {
            const service = await agent.Service.addComment(data);
            if (service)
                return service;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
)

export const updateServicesAsync = createAsyncThunk<Service, FieldValues>(
    'services/updateServicesAsync',
    async (data, thunkAPI) => {
        try {
            const service = await agent.Service.updateService(data);
            if (service)
                return service
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
)

export const addServicesAsync = createAsyncThunk<void, FieldValues>(
    'services/addServicesAsync',
    async (data, thunkAPI) => {
        try {
            await agent.Service.addService(data);
            await thunkAPI.dispatch(fetchServicesAsync());
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        } 
    }
)

export const serviceSlice = createSlice({
    name: 'services',
    initialState,
    reducers: {
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
        builder.addCase(updateServicesAsync.pending, (state, action) => {
            state.status = 'pendingUpdateService' + action.meta.arg.id;
        });
        builder.addCase(addServicesAsync.pending, (state, action) => {
            state.status = 'pendingAddingService';
        });
        builder.addCase(addCommentAsync.pending, (state, action) => {
            state.status = 'pendingAddCommnet';
        });
        builder.addCase(removeServiceAsync.fulfilled, (state, action) => {
            const Id = action.meta.arg.id;
            const serviceIndex = state.services?.findIndex(i => i.id === Id);
            if (Id === -1 || serviceIndex === undefined)
                return;
            state.services?.splice(serviceIndex, 1);
            state.status = 'idle';
        });
        builder.addCase(fetchServicesAsync.fulfilled, (state, action) => {
            state.services = action.payload;
            state.status = 'idle';
        });
        builder.addCase(addServicesAsync.fulfilled, (state, action) => {
            state.status = 'idle';
        });
        builder.addMatcher(isAnyOf(addCommentAsync.fulfilled, updateServicesAsync.fulfilled), (state, action) => {
            const service = action.payload;
            if (service === undefined)
                return;
            let newServices = state.services!.map(item => (
                item.id === service.id ? service : item
            ));
            state.services = newServices;
            state.status = 'idle';
        });
        builder.addMatcher(isAnyOf(fetchServicesAsync.rejected, addCommentAsync.rejected, removeServiceAsync.rejected, updateServicesAsync.rejected), (state, action) => {
            state.status = 'idle';
            console.log(action.payload);
        });

    })
})

export const { addService } = serviceSlice.actions;