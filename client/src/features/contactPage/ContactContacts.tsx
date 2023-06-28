import { Grid, Typography, Button, TableContainer, Table, TableBody, TableCell, TableRow, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Contact, ContactCustom } from "../../app/models/contact";
import ContactContactsTable from "./ContactContactsTable";
import { FieldValues, useForm } from "react-hook-form";
import { useAppDispatch } from "../../app/service/configureService";
import { LoadingButton } from "@mui/lab";
import agent from "../../app/api/agent";
import { setContacts } from "./contactSlice";

interface Props {
    contact: Contact;
}

export default function ContactContacts({ contact }: Props) {
    const { control, handleSubmit } = useForm();
    const dispatch = useAppDispatch();
    const [customContacts, setCustomContacts] = useState<ContactCustom[]>([]);

    const [newNameState, setNewNameState] = useState<string>('');
    const [newContentState, setNewContentState] = useState<string>('');
    const [loadingSubmit, setLoadingSubmit] = useState(false);

    const [editContactsMode, setEditContactsMode] = useState(false);
    const [editingCustomContact, setEditingCustomContact] = useState(-1);
    const [addingNewCustomContact, setaddingNewCustomContact] = useState(false);
    const [customContactsLoaded, setCustomContactsLoaded] = useState(false);

    useEffect(() => {
        if (!customContactsLoaded) {
            contact.contactCustoms.forEach(element => {
                setCustomContacts(contact.contactCustoms);
            });
        }
        setCustomContactsLoaded(true);
    }, [contact.contactCustoms, customContactsLoaded])

    function handleOnSubmitContactData(data: FieldValues) {
        setLoadingSubmit(true);
        data.Id = 1;
        data.contactCustoms = customContacts;
        agent.Contact
            .updateContact(data)
            .then(contacts => dispatch(setContacts(contacts)))
            .catch(error => console.log(error))
            .finally(finishActions);

        function finishActions(){
            setLoadingSubmit(false);
            setEditContactsMode(false);
        }

        console.log(data);
    }

    function addNewCustomContact(name: string, content: string) {
        const lastItem = customContacts.length > 0 ? customContacts[customContacts.length - 1] : undefined;
        const newItemId = lastItem && lastItem.id ? lastItem.id + 1 : 0;
        const newItem: ContactCustom = { id: newItemId, name: newNameState, content: newContentState }
        setCustomContacts(prevState => {
            return [...prevState, newItem]
        })
        setaddingNewCustomContact(false);
    }

    return (
        <Grid item xs={12}>
            {!editContactsMode ? (
                <Grid container>
                    <Grid item>
                        <Typography variant="h4">Contact</Typography>
                    </Grid>
                    <Grid item>
                        <Button onClick={() => setEditContactsMode(true)}>Edit</Button>
                    </Grid>
                    <ContactContactsTable
                        control={control}
                        contact={contact}
                        editContactsMode={editContactsMode}
                        editingCustomContact={editingCustomContact}
                        setEditingCustomContact={setEditingCustomContact}
                        addingNewCustomContact={addingNewCustomContact}
                        customContacts={customContacts}
                        setCustomContacts={setCustomContacts}
                    />
                </Grid>
            ) : (
                <Grid container>
                    <Grid item>
                        <Typography variant="h4">Contact</Typography>
                    </Grid>
                    <Grid item>
                        <LoadingButton loading={loadingSubmit} onClick={handleSubmit(handleOnSubmitContactData)} color="success">Submit</LoadingButton>
                        <Button onClick={() => setEditContactsMode(false)} color="error">Cancel</Button>
                    </Grid>
                    <ContactContactsTable
                        control={control}
                        contact={contact}
                        editContactsMode={editContactsMode}
                        editingCustomContact={editingCustomContact}
                        setEditingCustomContact={setEditingCustomContact}
                        addingNewCustomContact={addingNewCustomContact}
                        customContacts={customContacts}
                        setCustomContacts={setCustomContacts}
                    />
                    {editingCustomContact === -1 ? (
                        <>
                            {!addingNewCustomContact ? (
                                <Button onClick={() => setaddingNewCustomContact(true)}>Add new contact option</Button>
                            ) : (
                                <>
                                    <TableContainer>
                                        <Table>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell width="30%">
                                                        <TextField
                                                            label="Contact name"
                                                            fullWidth
                                                            value={newNameState}
                                                            onChange={e => setNewNameState(e.target.value)}
                                                        />
                                                    </TableCell>
                                                    <TableCell width="55%">
                                                        <TextField
                                                            label="Contact data"
                                                            fullWidth
                                                            value={newContentState}
                                                            onChange={e => setNewContentState(e.target.value)}
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <Button color="success" onClick={() => addNewCustomContact(newNameState, newContentState)}>Submit</Button>
                                                        <Button color="error" onClick={() => setaddingNewCustomContact(false)}>Cancel</Button>
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </>
                            )}
                        </>
                    ) : (<></>)}

                </Grid>
            )}
        </Grid>
    )
}