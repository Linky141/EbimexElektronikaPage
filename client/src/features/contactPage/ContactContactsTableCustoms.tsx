import { TableContainer, Table, TableBody, TableCell, TableRow } from "@mui/material";
import ContactContactsTableCustomsRow from "./ContactContactsTableCustomsRow";

interface Props {
    //contact: Contact;
    editContactsMode: boolean;
    editingCustomContact: number;
    setEditingCustomContact: (state: number) => void;
    addingNewCustomContact: boolean;
    customContacts: [number, string, string][];
    setCustomContacts: (contact: [number, string, string][]) => void;
}

export default function ContactContactsTableCustoms(props: Props) {
    return (
        <>
            {!props.editContactsMode ? (
                <>
                    {props.customContacts.map(customContact => (
                        <TableRow key={customContact[0]}>
                            <TableCell>{customContact[1]}</TableCell>
                            <TableCell>{customContact[2]}</TableCell>
                        </TableRow>
                    ))}
                </>

            ) : (
                <TableContainer>
                    <Table>
                        <TableBody>
                            {props.customContacts.map(customContact => (
                                <ContactContactsTableCustomsRow
                                    key={customContact[0]}
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