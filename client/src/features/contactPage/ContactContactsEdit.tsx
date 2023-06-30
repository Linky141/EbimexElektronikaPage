import { Grid, Typography, Button } from "@mui/material";
import { useState } from "react";
import { Contact, ContactCustom } from "../../app/models/contact";
import ContactContactsTable from "./ContactContactsTable";
import { Control, FieldValues, UseFormHandleSubmit } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import ContactContactsEditAddingNewEntry from "./ContactContactsEditAddingNewEntry";

interface Props {
    contact: Contact;
    control: Control<FieldValues, any>;
    editContactsMode: boolean;
    customContacts: ContactCustom[];
    setCustomContacts: React.Dispatch<React.SetStateAction<ContactCustom[]>>;
    loadingSubmit: boolean;
    handleSubmit: UseFormHandleSubmit<FieldValues, undefined>;
    handleUpdateData: (data: FieldValues) => void;
    setEditContactsMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ContactContactsEdit(props: Props) {
    const [addingNewCustomContact, setaddingNewCustomContact] = useState(false);
    const [editingCustomContact, setEditingCustomContact] = useState(-1);

    return (
        <Grid container>
            <Grid item>
                <Typography variant="h4">Contact</Typography>
            </Grid>
            <Grid item>
                <LoadingButton loading={props.loadingSubmit} onClick={props.handleSubmit(props.handleUpdateData)} color="success">Submit</LoadingButton>
                <Button onClick={() => props.setEditContactsMode(false)} color="error">Cancel</Button>
            </Grid>
            <ContactContactsTable
                control={props.control}
                contact={props.contact}
                editContactsMode={props.editContactsMode}
                editingCustomContact={editingCustomContact}
                setEditingCustomContact={setEditingCustomContact}
                addingNewCustomContact={addingNewCustomContact}
                customContacts={props.customContacts}
                setCustomContacts={props.setCustomContacts}
            />
            <ContactContactsEditAddingNewEntry
                addingNewCustomContact={addingNewCustomContact}
                customContacts={props.customContacts}
                editingCustomContact={editingCustomContact}
                setCustomContacts={props.setCustomContacts}
                setaddingNewCustomContact={setaddingNewCustomContact}
            />
        </Grid>
    )
}