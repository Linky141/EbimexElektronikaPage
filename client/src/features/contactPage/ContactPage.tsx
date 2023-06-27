import { useState, useEffect } from "react";
import { Contact } from "../../app/models/contact";
import { Grid } from "@mui/material";
import ContactAddress from "./ContactAddress";
import ContactContacts from "./ContactContacts";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch } from "../../app/service/configureService";

export default function ContactPage() {
    const dispatch = useAppDispatch();

    // const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        agent.Contact.list()
            // .then(contacts => dispatch(setContacts(contacts)))
            .then(contacts => dispatch(contacts.setContacts(contacts)))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }, [dispatch])


    if (loading)
        return <LoadingComponent message='Loading contact info...' />

    return (
        <>
            {/* {contacts.map(contact => (
                <Grid container key={contact.id}>
                    <ContactAddress contact={contact} setContacts={setContacts} />
                    <ContactContacts contact={contact} />
                </Grid>
            ))
            } */}
        </>
    )
}