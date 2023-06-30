import { createSlice } from "@reduxjs/toolkit";
import { Info } from "../../app/models/info";

interface InfoState {
    info: Info[] | null
}

const initialState: InfoState = {
    info: null
}

export const infoSlice = createSlice({
    name: 'infos',
    initialState,
    reducers: {
        setInfos: (state, action) => {
            state.info = action.payload
        }
    }
})

export const { setInfos } = infoSlice.actions;