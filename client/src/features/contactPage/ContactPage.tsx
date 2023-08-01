import { Grid } from "@mui/material";
import ContactAddress from "./ContactAddress";
import ContactContacts from "./ContactContacts";

export default function ContactPage() {
    return (
        <Grid container>
            <ContactAddress />
            <ContactContacts />
        </Grid>
    )
}