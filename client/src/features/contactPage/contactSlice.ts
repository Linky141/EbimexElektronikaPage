import { createSlice } from "@reduxjs/toolkit";
import { Contact } from "../../app/models/contact";

interface ContactsState{
    contact: Contact[] | null
}

const initialState: ContactsState = {
    contact: null
}

export const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        setContacts: (state, action) => {
            state.contact = action.payload
        }
    }
})