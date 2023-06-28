import { TableContainer, Table, TableBody, TableCell, TableRow } from "@mui/material";
import { Contact, ContactCustom } from "../../app/models/contact";
import ContactContactsTableCustoms from "./ContactContactsTableCustoms";
import { Control, FieldValues } from "react-hook-form";
import ContactContactsTextField from "./ContactContactsTextField";

interface Props {
    contact: Contact;
    editContactsMode: boolean;
    editingCustomContact: number;
    setEditingCustomContact: (state: number) => void;
    addingNewCustomContact: boolean;
    control: Control<FieldValues, any>;
    customContacts: ContactCustom[];
    setCustomContacts: (contact: ContactCustom[]) => void;
}

export default function ContactContactsTable(props: Props) {
    return (
        <>
            {!props.editContactsMode ? (
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
            ) : (
                <>
                    <TableContainer>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        <ContactContactsTextField
                                            label="Phone"
                                            content={props.contact.phone}
                                            fullWidth={true}
                                            name={"Phone"}
                                            control={props.control}
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <ContactContactsTextField
                                            label="Email"
                                            content={props.contact.email}
                                            fullWidth={true}
                                            name={"Email"}
                                            control={props.control}
                                        />
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <ContactContactsTableCustoms
                        editContactsMode={props.editContactsMode}
                        editingCustomContact={props.editingCustomContact}
                        setEditingCustomContact={props.setEditingCustomContact}
                        addingNewCustomContact={props.addingNewCustomContact}
                        customContacts={props.customContacts}
                        setCustomContacts={props.setCustomContacts}
                    />
                </>
            )}
        </>
    )
}