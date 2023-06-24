import { Grid, Typography, Button } from "@mui/material";
import { useState } from "react";
import { Contact } from "../../app/models/contact";
import ContactAddressTable from "./ContactAddressTable";

interface Props {
    contact: Contact;
}

export default function ContactAddress({ contact }: Props) {
    const [editAddressMode, setEditAddressMode] = useState(false);

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
                <form>
                    <Grid container>
                        <Grid item>
                            <Typography variant="h4">Address</Typography>
                        </Grid>
                        <Grid item>
                            <Button type="submit" color="success">Submit</Button>
                            <Button onClick={() => setEditAddressMode(false)} color="error">Cancel</Button>
                        </Grid>
                        <ContactAddressTable
                            contact={contact}
                            editAddressMode={editAddressMode}
                        />
                    </Grid>
                </form>
            )}

        </Grid>
    )
}