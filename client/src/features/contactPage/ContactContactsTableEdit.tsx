import { TableContainer, Table, TableBody, TableCell, TableRow } from "@mui/material";
import { Contact, ContactCustom } from "../../app/models/contact";
import ContactContactsTableCustoms from "./ContactContactsTableCustoms";
import { Control, FieldValues } from "react-hook-form";
import ContactContactsTextField from "./ContactContactsTextField";

interface Props {
    contact: Contact;
    editContactsMode: boolean;
    editingCustomContact: number;
    setEditingCustomContact: ((state: number) => void) | undefined;
    addingNewCustomContact: boolean;
    control: Control<FieldValues, any>;
    customContacts: ContactCustom[];
    setCustomContacts: (contact: ContactCustom[]) => void;
}

export default function ContactContactsTableEdit(props: Props) {
    return (
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
    )
}