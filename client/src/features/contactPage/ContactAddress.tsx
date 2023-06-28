import { Grid, Typography, Button } from "@mui/material";
import { useState } from "react";
import { Contact } from "../../app/models/contact";
import ContactAddressTable from "./ContactAddressTable";
import agent from "../../app/api/agent";
import { FieldValues, useForm } from "react-hook-form";
import { setContacts } from "./contactSlice";
import { useAppDispatch } from "../../app/service/configureService";
import { LoadingButton } from "@mui/lab";

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

        function finishActions(){
            setLoadingSubmit(false);
            setEditAddressMode(false);
        }
    }

    return (
        <Grid item xs={12}>
            {!editAddressMode ? (
                <Grid container>
                    <Grid item>
                        <Typography variant="h4">Address</Typography>
                    </Grid>
                    <Grid item>
                        <Button onClick={() => setEditAddressMode(true)}>Edit</Button>
                    </Grid>
                    <ContactAddressTable
                        contact={contact}
                        control={control}
                        editAddressMode={editAddressMode}
                    />
                </Grid>
            ) : (
                <Grid container>
                    <Grid item>
                        <Typography variant="h4">Address</Typography>
                    </Grid>
                    <Grid item>
                        {/* <Button onClick={handleOnSubmitAddress} color="success">Submit</Button> */}
                        <LoadingButton loading={loadingSubmit} onClick={handleSubmit(handleOnSubmitAddress)} color="success">Submit</LoadingButton>
                        <Button onClick={() => setEditAddressMode(false)} color="error">Cancel</Button>
                    </Grid>
                    <ContactAddressTable
                        contact={contact}
                        control={control}
                        editAddressMode={editAddressMode}
                    />
                </Grid>
            )}

        </Grid>
    )
}