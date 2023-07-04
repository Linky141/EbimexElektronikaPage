import { Grid, Typography, Button } from "@mui/material";
import { useState } from "react";
import { Contact, ContactCustom } from "../../app/models/contact";
import ContactContactsTable from "./ContactContactsTable";
import { Control, FieldValues, UseFormHandleSubmit } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import ContactContactsEditAddingNewEntry from "./ContactContactsEditAddingNewEntry";
import { useTranslation } from "react-i18next";

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
    const { t } = useTranslation();

    return (
        <Grid container>
            <Grid item>
                <Typography variant="h4">{t("contact")}</Typography>
            </Grid>
            <Grid item>
                <LoadingButton loading={props.loadingSubmit} onClick={props.handleSubmit(props.handleUpdateData)} color="success">{t("submit")}</LoadingButton>
                <Button onClick={() => props.setEditContactsMode(false)} color="error">{t("cancel")}</Button>
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