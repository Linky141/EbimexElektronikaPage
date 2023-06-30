import { Grid, Typography, Button } from "@mui/material";
import { Contact, ContactCustom } from "../../app/models/contact";
import ContactContactsTable from "./ContactContactsTable";
import { Control, FieldValues } from "react-hook-form";

interface Props {
    contact: Contact;
    setEditContactsMode: React.Dispatch<React.SetStateAction<boolean>>;
    control: Control<FieldValues, any>;
    editContactsMode: boolean;
    customContacts: ContactCustom[];
    setCustomContacts: React.Dispatch<React.SetStateAction<ContactCustom[]>>;
}

export default function ContactContactsShow(props: Props) {
    return (
        <Grid container>
            <Grid item>
                <Typography variant="h4">Contact</Typography>
            </Grid>
            <Grid item>
                <Button onClick={() => props.setEditContactsMode(true)}>Edit</Button>
            </Grid>
            <ContactContactsTable
                control={props.control}
                contact={props.contact}
                editContactsMode={props.editContactsMode}
                editingCustomContact={-1}
                setEditingCustomContact={undefined}
                addingNewCustomContact={false}
                customContacts={props.customContacts}
                setCustomContacts={props.setCustomContacts}
            />
        </Grid>
    )
}