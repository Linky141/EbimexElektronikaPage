import { Grid, Typography, Button } from "@mui/material";
import { useState } from "react";
import { Contact } from "../../app/models/contact";
import ContactAddressTable from "./ContactAddressTable";
import agent from "../../app/api/agent";
import { FieldValues, useForm } from "react-hook-form";

interface Props {
    contact: Contact;
    setContacts: (contacts: any) => void;
}

export default function ContactAddress({ contact, setContacts }: Props) {
    const { control, handleSubmit } = useForm();
    const [editAddressMode, setEditAddressMode] = useState(false);

    function handleOnSubmitAddress(data: FieldValues) {
        data.Id = 1;
        agent.Contact
            .updateAddress(data)
            .catch(error => console.log(error));

        setEditAddressMode(false);


        console.log(contact);
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
                        <Button onClick={handleSubmit(handleOnSubmitAddress)} color="success">Submit</Button>
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