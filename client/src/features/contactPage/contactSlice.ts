import { createSlice } from "@reduxjs/toolkit";
import { Contact } from "../../app/models/contact";

interface ContactsState {
    contacts: Contact[] | null
}

const initialState: ContactsState = {
    contacts: null
}

export const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        setContacts: (state, action) => {
            state.contacts = action.payload
        }
    }
})

export const { setContacts } = contactsSlice.actions;