import { TableContainer, Table, TableBody, TableCell, TableRow } from "@mui/material";
import ContactContactsTableCustomsRow from "./ContactContactsTableCustomsRow";
import { ContactCustom } from "../../app/models/contact";

interface Props {
    //contact: Contact;
    editContactsMode: boolean;
    editingCustomContact: number;
    setEditingCustomContact: (state: number) => void;
    addingNewCustomContact: boolean;
    customContacts: ContactCustom[];
    setCustomContacts: (contact: ContactCustom[]) => void;
}

export default function ContactContactsTableCustoms(props: Props) {
    return (
        <>
            {!props.editContactsMode ? (
                <>
                    {props.customContacts.map(customContact => (
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
                            {props.customContacts.map(customContact => (
                                <ContactContactsTableCustomsRow
                                    key={customContact.id}
                                    editingCustomContact={props.editingCustomContact}
                                    setEditingCustomContact={props.setEditingCustomContact}
                                    addingNewCustomContact={props.addingNewCustomContact}
                                    customContact={customContact}
                                    customContacts={props.customContacts}
                                    setCustomContacts={props.setCustomContacts}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </>
    )
}