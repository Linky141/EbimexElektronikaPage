import { Grid } from "@mui/material";
import ContactAddress from "./ContactAddress";
import ContactContacts from "./ContactContacts";
import { useAppSelector } from "../../app/service/configureService";

export default function ContactPage() {
    const { contacts } = useAppSelector(state => state.contacts);

    return (
        <>
            {contacts!.map(contact => (
                <Grid container key={contact.id}>
                    <ContactAddress contact={contact} />
                    <ContactContacts contact={contact} />
                </Grid>
            ))
            }
        </>
    )
}