import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { Info } from "../../app/models/info";
import { FieldValues } from "react-hook-form";
import agent from "../../app/api/agent";

interface InfoState {
    info: Info | null;
    status: string;
}

const initialState: InfoState = {
    info: null,
    status: 'idle'
}

export const fetchInfoAsync = createAsyncThunk<Info>(
    'basket/fetchInfoAsync',
    async (_, thunkAPI) => {
        try {
            const infos = await agent.Info.list();
            return infos[0];
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)

export const updateOpenHoursAsync = createAsyncThunk<Info, FieldValues>(
    'infos/updateOpenHoursAsync',
    async (data, thunkAPI) => {
        try {
            data.Id = 1;
            const infoDto = await agent.Info.UpdateOpenHours(data);
            if (infoDto) {
                thunkAPI.dispatch(setInfo(infoDto));
                return infoDto[0];
            }
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
)

export const updateAnnouncementsAsync = createAsyncThunk<Info, FieldValues>(
    'infos/updateAnnouncementsAsync',
    async (data, thunkAPI) => {
        try {
            data.Id = 1;
            const infoDto = await agent.Info.UpdateAnnouncements(data);
            if (infoDto) {
                thunkAPI.dispatch(setInfo(infoDto));
                return infoDto[0];
            }
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
)

export const infoSlice = createSlice({
    name: 'info',
    initialState,
    reducers: {
        setInfo: (state, action) => {
            state.info = action.payload
        }
    },
    extraReducers: (builder => {
        builder.addMatcher(isAnyOf(updateAnnouncementsAsync.pending, updateOpenHoursAsync.pending), (state, action) => {
            state.status = 'pendingInfo';
        });
        builder.addMatcher(isAnyOf(updateAnnouncementsAsync.fulfilled, fetchInfoAsync.fulfilled, updateOpenHoursAsync.fulfilled), (state, action) => {
            state.info = action.payload;
            state.status = 'idle';
        });
        builder.addMatcher(isAnyOf(updateAnnouncementsAsync.rejected, fetchInfoAsync.rejected, updateOpenHoursAsync.rejected), (state, action) => {
            state.status = 'idle';
            console.log(action.payload);
        });
    })
})

export const { setInfo } = infoSlice.actions;