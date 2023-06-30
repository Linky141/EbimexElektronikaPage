import { TableContainer, Table, TableBody, TableCell, TableRow } from "@mui/material";
import { Contact, ContactCustom } from "../../app/models/contact";
import ContactContactsTableCustoms from "./ContactContactsTableCustoms";

interface Props {
    contact: Contact;
    editContactsMode: boolean;
    editingCustomContact: number;
    setEditingCustomContact: ((state: number) => void) | undefined;
    addingNewCustomContact: boolean;
    customContacts: ContactCustom[];
    setCustomContacts: (contact: ContactCustom[]) => void;
}

export default function ContactContactsTableShow(props: Props) {
    return (
        <TableContainer>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell>Phone</TableCell>
                        <TableCell>{props.contact.phone}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Email</TableCell>
                        <TableCell>{props.contact.email}</TableCell>
                    </TableRow>
                    <ContactContactsTableCustoms
                        editContactsMode={props.editContactsMode}
                        editingCustomContact={props.editingCustomContact}
                        setEditingCustomContact={props.setEditingCustomContact}
                        addingNewCustomContact={props.addingNewCustomContact}
                        customContacts={props.customContacts}
                        setCustomContacts={props.setCustomContacts}
                    />
                </TableBody>
            </Table>
        </TableContainer>
    )
}