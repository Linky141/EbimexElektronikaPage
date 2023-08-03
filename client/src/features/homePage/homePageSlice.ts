import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { Info } from "../../app/models/info";
import { FieldValues } from "react-hook-form";
import agent from "../../app/api/agent";
import { HomePage } from "../../app/models/homePage";

interface HomePageState {
    homePage: HomePage | null;
    status: string;
}

const initialState: HomePageState = {
    homePage: null,
    status: 'idle'
}

export const fetchHomePageAsync = createAsyncThunk<HomePage>(
    'infos/fetchHomePageAsync',
    async (_, thunkAPI) => {
        try {
            const homePages = await agent.HomePage.get();
            return homePages[0];
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
)

export const updateHomePageAsync = createAsyncThunk<HomePage, FieldValues>(
    'services/updateHomePageAsync',
    async (data, thunkAPI) => {
        try {
            const homePage = await agent.HomePage.update(data);
            if (homePage) {
                thunkAPI.dispatch(setHomePage(homePage));
                return homePage[0];
            }
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
)

export const homePageSlice = createSlice({
    name: 'homePage',
    initialState,
    reducers: {
        setHomePage: (state, action) => {
            state.homePage = action.payload
        }
    },
    extraReducers: (builder => {
        builder.addCase(updateHomePageAsync.pending, (state, action) => {
            state.status = 'pendingUpdateHomePage';
        });

        builder.addCase(fetchHomePageAsync.fulfilled, (state, action) => {
            state.homePage = action.payload;
            state.status = 'idle';
        });
        builder.addCase(updateHomePageAsync.fulfilled, (state, action) => {
            const homePage = action.payload;
            if (homePage === undefined)
                return;
            state.status = 'idle';
        });

        builder.addMatcher(isAnyOf(fetchHomePageAsync.rejected, updateHomePageAsync.rejected), (state, action) => {
            state.status = 'idle';
            console.log(action.payload);
        });
    })
})

export const { setHomePage } = homePageSlice.actions;