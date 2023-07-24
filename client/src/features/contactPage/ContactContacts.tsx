import { Button, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { ContactCustom } from "../../app/models/contact";
import { FieldValues, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../app/service/configureService";
import { t } from "i18next";
import { LoadingButton } from "@mui/lab";
import ContactContactsTable from "./ContactContactsTable";
import ContactContactsEditAddingNewEntry from "./ContactContactsEditAddingNewEntry";
import { updateContactContacts } from "./contactSlice";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { isAdmin } from "../../app/utils/RolesUtils";

export default function ContactContacts() {
    const dispatch = useAppDispatch();
    const { control, handleSubmit, formState: { isSubmitting } } = useForm();
    const { user } = useAppSelector(state => state.account);
    const { contact } = useAppSelector(state => state.contact);
    const [editingCustomContact, setEditingCustomContact] = useState(-1);
    const [addingNewCustomContact, setaddingNewCustomContact] = useState(false);
    const [customContacts, setCustomContacts] = useState<ContactCustom[]>(contact!.contactCustoms);
    const [editContactsMode, setEditContactsMode] = useState(false);

    async function submitForm(data: FieldValues) {
        try {
            data.contactCustoms = customContacts;
            await dispatch(updateContactContacts(data));
        } catch (error) {
            console.log(error);
        } finally {
            setEditContactsMode(false);
        }
    }

    if (!contact)
    return <LoadingComponent />;

    return (
        <Grid item xs={12}>
            {!editContactsMode ? (
                <Grid container>
                    <Grid item>
                        <Typography variant="h4">{t("contact")}</Typography>
                    </Grid>
                    {isAdmin(user) &&
                        <Grid item>
                            <Button onClick={() => setEditContactsMode(true)}>{t("edit")}</Button>
                        </Grid>
                    }
                </Grid>
            ) : (
                <Grid container>
                    <Grid item>
                        <Typography variant="h4">{t("contact")}</Typography>
                    </Grid>
                    <Grid item>
                        <LoadingButton loading={isSubmitting} onClick={handleSubmit(submitForm)} color="success">{t("save")}</LoadingButton>
                        <Button onClick={() => setEditContactsMode(false)} color="error">{t("cancel")}</Button>
                    </Grid>
                </Grid>
            )}
            <ContactContactsTable
                control={control}
                contact={contact}
                editContactsMode={editContactsMode}
                editingCustomContact={editingCustomContact}
                setEditingCustomContact={setEditingCustomContact}
                addingNewCustomContact={addingNewCustomContact}
                customContacts={customContacts}
                setCustomContacts={setCustomContacts}
            />
            {editContactsMode ? (
                <ContactContactsEditAddingNewEntry
                    addingNewCustomContact={addingNewCustomContact}
                    customContacts={customContacts}
                    editingCustomContact={editingCustomContact}
                    setCustomContacts={setCustomContacts}
                    setaddingNewCustomContact={setaddingNewCustomContact}
                />
            ) : (<></>)}
        </Grid>
    )
}