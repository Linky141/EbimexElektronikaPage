import { Grid } from "@mui/material";
import { useState } from "react";
import { Contact } from "../../app/models/contact";
import agent from "../../app/api/agent";
import { FieldValues, useForm } from "react-hook-form";
import { setContacts } from "./contactSlice";
import { useAppDispatch } from "../../app/service/configureService";
import ContactAddressShow from "./ContactAddressShow";
import ContactAddressEdit from "./ContactAddressEdit";

interface Props {
    contact: Contact;
}

export default function ContactAddress({ contact }: Props) {
    const { control, handleSubmit } = useForm();
    const dispatch = useAppDispatch();

    const [editAddressMode, setEditAddressMode] = useState(false);
    const [loadingSubmit, setLoadingSubmit] = useState(false);

    function handleOnSubmitAddress(data: FieldValues) {
        setLoadingSubmit(true);
        data.Id = 1;

        agent.Contact
            .updateAddress(data)
            .then(contacts => dispatch(setContacts(contacts)))
            .catch(error => console.log(error))
            .finally(finishActions);

        function finishActions() {
            setLoadingSubmit(false);
            setEditAddressMode(false);
        }
    }

    return (
        <Grid item xs={12}>
            {!editAddressMode ? (
                <ContactAddressShow
                    contact={contact}
                    control={control}
                    editAddressMode={editAddressMode}
                    setEditAddressMode={setEditAddressMode}
                />
            ) : (
                <ContactAddressEdit
                    contact={contact}
                    control={control}
                    editAddressMode={editAddressMode}
                    setEditAddressMode={setEditAddressMode}
                    handleOnSubmitAddress={handleOnSubmitAddress}
                    handleSubmit={handleSubmit}
                    loadingSubmit={loadingSubmit}
                />
            )}

        </Grid>
    )
}