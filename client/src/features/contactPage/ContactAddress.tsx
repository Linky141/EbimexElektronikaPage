import { Grid, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Contact } from "../../app/models/contact";
import ContactAddressTable from "./ContactAddressTable";
import agent from "../../app/api/agent";
import { useForm } from "react-hook-form";

interface Props {
    contact: Contact;
}

export default function ContactAddress({ contact }: Props) {

    const [editAddressMode, setEditAddressMode] = useState(false);

    function handleOnSubmitAddress() {
        agent.Contact.updateAddress(contact)
            .catch(error => console.log(error));
        setEditAddressMode(false);
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
                        editAddressMode={editAddressMode}
                    />
                </Grid>
            ) : (
                <Grid container>
                    <Grid item>
                        <Typography variant="h4">Address</Typography>
                    </Grid>
                    <Grid item>
                        <Button onClick={handleOnSubmitAddress} color="success">Submit</Button>
                        <Button onClick={() => setEditAddressMode(false)} color="error">Cancel</Button>
                    </Grid>
                    <ContactAddressTable
                        contact={contact}
                        editAddressMode={editAddressMode}
                    />
                </Grid>
            )}

        </Grid>
    )
}