import { TableContainer, Table, TableBody, TableCell, TableRow, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Contact } from "../../app/models/contact";
import ContactContactsTableCustoms from "./ContactContactsTableCustoms";

interface Props {
    contact: Contact;
    editContactsMode: boolean;
    editingCustomContact: number;
    setEditingCustomContact: (state: number) => void;
    addingNewCustomContact: boolean;
}

export default function ContactContactsTable({ contact, editContactsMode, editingCustomContact, setEditingCustomContact, addingNewCustomContact }: Props) {
    const [phoneData, setPhoneData] = useState<string>();
    const [emailData, setEmailData] = useState<string>();

    useEffect(() => {
        setPhoneData(contact.phone);
        setEmailData(contact.email)
    }, [contact.email, contact.phone]);

    return (
        <>
            {!editContactsMode ? (
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Phone</TableCell>
                                <TableCell>{contact.phone}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Email</TableCell>
                                <TableCell>{contact.email}</TableCell>
                            </TableRow>
                            <ContactContactsTableCustoms
                                contact={contact}
                                editContactsMode={editContactsMode}
                                editingCustomContact={editingCustomContact}
                                setEditingCustomContact={setEditingCustomContact}
                                addingNewCustomContact={addingNewCustomContact}
                            />
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <>
                    <TableContainer>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        <TextField
                                            value={phoneData}
                                            onChange={e => setPhoneData(e.target.value)}
                                            fullWidth
                                            label="Phone"
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <TextField
                                            value={emailData}
                                            onChange={e => setEmailData(e.target.value)}
                                            fullWidth
                                            label="Email"
                                        />
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <ContactContactsTableCustoms
                        contact={contact}
                        editContactsMode={editContactsMode}
                        editingCustomContact={editingCustomContact}
                        setEditingCustomContact={setEditingCustomContact}
                        addingNewCustomContact={addingNewCustomContact}
                    />
                </>
            )}
        </>
    )
}