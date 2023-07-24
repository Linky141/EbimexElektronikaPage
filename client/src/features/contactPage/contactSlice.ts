import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { Contact } from "../../app/models/contact";
import agent from "../../app/api/agent";
import { FieldValues } from "react-hook-form";

interface ContactState {
    contact: Contact | null;
    status: string;
}

const initialState: ContactState = {
    contact: null,
    status: 'idle'
}

export const fetchContactsAsync = createAsyncThunk<Contact>(
    'contacts/fetchContactsAsync',
    async (_, thunkAPI) => {
        try {
            const contacts = await agent.Contact.list();
            return contacts[0];
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
)

export const updateContactAddress = createAsyncThunk<Contact, FieldValues>(
    'contacts/updateContactAddress',
    async (data, thunkAPI) => {
        try {
            data.Id = 1;
            const contactDto = await agent.Contact.updateAddress(data);
            if (contactDto) {
                thunkAPI.dispatch(setContact(contactDto));
                return contactDto[0];
            }
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
)

export const updateContactContacts = createAsyncThunk<Contact, FieldValues>(
    'contacts/updateContactContacts',
    async (data, thunkAPI) => {
        try {
            data.Id = 1;
            const contactDto = await agent.Contact.updateContact(data);
            if (contactDto) {
                thunkAPI.dispatch(setContact(contactDto));
                return contactDto[0];
            }
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
)

export const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {
        setContact: (state, action) => {
            state.contact = action.payload
        }
    },
    extraReducers: (builder => {
        builder.addMatcher(isAnyOf(updateContactAddress.pending, updateContactContacts.pending), (state, action) => {
            state.status = 'pendingContact';
        });
        builder.addMatcher(isAnyOf(fetchContactsAsync.fulfilled, updateContactAddress.fulfilled, updateContactContacts.fulfilled), (state, action) => {
            state.contact = action.payload;
            state.status = 'idle';
        });
        builder.addMatcher(isAnyOf(fetchContactsAsync.rejected, updateContactAddress.rejected, updateContactContacts.rejected), (state, action) => {
            state.status = 'idle';
            console.log(action.payload);
        });
    })
})

export const { setContact } = contactSlice.actions;