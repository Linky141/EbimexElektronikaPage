import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { Contact, ContactCustom } from "../../app/models/contact";
import { FieldValues, useForm } from "react-hook-form";
import { useAppDispatch } from "../../app/service/configureService";
import agent from "../../app/api/agent";
import { setContacts } from "./contactSlice";
import ContactContactsShow from "./ContactContactsShow";
import ContactContactsEdit from "./ContactContactsEdit";

interface Props {
    contact: Contact;
}

export default function ContactContacts({ contact }: Props) {
    const { control, handleSubmit } = useForm();
    const dispatch = useAppDispatch();
    const [customContacts, setCustomContacts] = useState<ContactCustom[]>([]);

    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [editContactsMode, setEditContactsMode] = useState(false);
    const [customContactsLoaded, setCustomContactsLoaded] = useState(false);

    useEffect(() => {
        if (!customContactsLoaded) {
            contact.contactCustoms.forEach(element => {
                setCustomContacts(contact.contactCustoms);
            });
        }
        setCustomContactsLoaded(true);
    }, [contact.contactCustoms, customContactsLoaded])

    function handleUpdateData(data: FieldValues) {
        setLoadingSubmit(true);
        data.Id = 1;
        data.contactCustoms = customContacts;
        agent.Contact
            .updateContact(data)
            .then(contacts => dispatch(setContacts(contacts)))
            .catch(error => console.log(error))
            .finally(finishActions);

        function finishActions() {
            setLoadingSubmit(false);
            setEditContactsMode(false);
        }
    }

    return (
        <Grid item xs={12}>
            {!editContactsMode ? (
                <ContactContactsShow
                    contact={contact}
                    control={control}
                    customContacts={customContacts}
                    editContactsMode={editContactsMode}
                    setCustomContacts={setCustomContacts}
                    setEditContactsMode={setEditContactsMode}
                />
            ) : (
                <ContactContactsEdit
                    contact={contact}
                    control={control}
                    customContacts={customContacts}
                    editContactsMode={editContactsMode}
                    setCustomContacts={setCustomContacts}
                    setEditContactsMode={setEditContactsMode}
                    handleSubmit={handleSubmit}
                    handleUpdateData={handleUpdateData}
                    loadingSubmit={loadingSubmit}
                />
            )}
        </Grid>
    )
}