import { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import ContactAddress from "./ContactAddress";
import ContactContacts from "./ContactContacts";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/service/configureService";
import { setContacts } from "./contactSlice";

export default function ContactPage() {
    const dispatch = useAppDispatch();
    const { contacts } = useAppSelector(state => state.contacts);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        agent.Contact.list()
            .then(contacts => dispatch(setContacts(contacts)))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }, [dispatch])


    if (loading)
        return <LoadingComponent message='Loading contact info...' />

    return (
        <>
            {contacts?.map(contact => (
                <Grid container key={contact.id}>
                    <ContactAddress contact={contact} />
                    <ContactContacts contact={contact} />
                </Grid>
            ))
            }
        </>
    )
}