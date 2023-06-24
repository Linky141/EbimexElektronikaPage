import { Grid, Typography, Button, TableContainer, Table, TableBody, TableCell, TableRow, TextField } from "@mui/material";
import { useState } from "react";
import { Contact } from "../../app/models/contact";
import ContactContactsTable from "./ContactContactsTable";

interface Props {
    contact: Contact;
}

export default function ContactContacts({ contact }: Props) {
    const [editContactsMode, setEditContactsMode] = useState(false);
    const [editingCustomContact, setEditingCustomContact] = useState(-1);
    const [addingNewCustomContact, setaddingNewCustomContact] = useState(false);

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
                        contact={contact}
                        editContactsMode={editContactsMode}
                        editingCustomContact={editingCustomContact}
                        setEditingCustomContact={setEditingCustomContact}
                        addingNewCustomContact={addingNewCustomContact}
                    />
                </Grid>
            ) : (
                <form>
                    <Grid container>
                        <Grid item>
                            <Typography variant="h4">Contact</Typography>
                        </Grid>
                        <Grid item>
                            <Button color="success">Submit</Button>
                            <Button onClick={() => setEditContactsMode(false)} color="error">Cancel</Button>
                        </Grid>
                        <ContactContactsTable
                            contact={contact}
                            editContactsMode={editContactsMode}
                            editingCustomContact={editingCustomContact}
                            setEditingCustomContact={setEditingCustomContact}
                            addingNewCustomContact={addingNewCustomContact}
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
                                                            />
                                                        </TableCell>
                                                        <TableCell width="55%">
                                                            <TextField
                                                                label="Contact data"
                                                                fullWidth
                                                            />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Button color="success">Submit</Button>
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
                </form>
            )}
        </Grid>
    )
}