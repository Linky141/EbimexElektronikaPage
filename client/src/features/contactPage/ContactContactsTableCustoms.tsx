import { TableContainer, Table, TableBody, TableCell, TableRow } from "@mui/material";
import { Contact } from "../../app/models/contact";
import ContactContactsTableCustomsRow from "./ContactContactsTableCustomsRow";

interface Props {
    contact: Contact;
    editContactsMode: boolean;
    editingCustomContact: number;
    setEditingCustomContact: (state: number) => void;
    addingNewCustomContact: boolean;
}

export default function ContactContactsTableCustoms({ editContactsMode, contact, editingCustomContact, addingNewCustomContact, setEditingCustomContact }: Props) {
    return (
        <>
            {!editContactsMode ? (
                <>
                    {contact.contactCustoms.map(customContact => (
                        <TableRow key={customContact.id}>
                            <TableCell>{customContact.name}</TableCell>
                            <TableCell>{customContact.content}</TableCell>
                        </TableRow>
                    ))}
                </>

            ) : (
                <TableContainer>
                    <Table>
                        <TableBody>
                            {contact.contactCustoms.map(customContact => (
                                <ContactContactsTableCustomsRow
                                    key={customContact.id}
                                    editingCustomContact={editingCustomContact}
                                    setEditingCustomContact={setEditingCustomContact}
                                    addingNewCustomContact={addingNewCustomContact}
                                    customContact={customContact}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </>
    )
}