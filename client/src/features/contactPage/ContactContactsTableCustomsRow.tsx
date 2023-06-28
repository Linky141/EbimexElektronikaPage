import { Button, TableCell, TableRow, TextField } from "@mui/material";
import { useState } from "react";
import { ContactCustom } from "../../app/models/contact";

interface Props {
    editingCustomContact: number;
    setEditingCustomContact: (state: number) => void;
    addingNewCustomContact: boolean;
    customContact: ContactCustom;
    customContacts: ContactCustom[];
    setCustomContacts: (contact: ContactCustom[]) => void;
}

export default function ContactContactsTableCustomsRow(props: Props) {
    const [nameState, setNameState] = useState<string | undefined>(props.customContact.name);
    const [contentState, setContentState] = useState<string | undefined>(props.customContact.content);

    function submitEditCustomContact(id: number) {
        const tmp: ContactCustom[] = props.customContacts.map(contact => {
            if (contact.id === id)
                return { id: id, name: nameState, content: contentState };
            else
                return contact;
        });

        props.setCustomContacts(tmp);
        props.setEditingCustomContact(-1);
    }

    function removeCustomContact(id: number) {
        props.setCustomContacts(
            props.customContacts.filter(a =>
                a.id !== id
            )
        );
    }

    return (
        <>
            {!(props.editingCustomContact === props.customContact.id) ? (
                <TableRow>
                    <TableCell width="30%">{props.customContact.name}</TableCell>
                    <TableCell width="54%">{props.customContact.content}</TableCell>
                    <TableCell>
                        {(props.editingCustomContact === -1 && !props.addingNewCustomContact) ? (
                            <>
                                <Button onClick={() => props.customContact.id && props.setEditingCustomContact(props.customContact.id)}>Edit</Button>
                                <Button onClick={() => props.customContact.id && removeCustomContact(props.customContact.id)} color="error" variant="outlined">Delete</Button>
                            </>
                        ) : (<></>)}

                    </TableCell>
                </TableRow>
            ) : (
                <TableRow>
                    <TableCell width="30%">
                        <TextField
                            label="Contact name"
                            value={nameState}
                            onChange={e => setNameState(e.target.value)}
                            fullWidth={true}
                        />
                    </TableCell>
                    <TableCell width="55%">
                        <TextField
                            label="Contact data"
                            value={contentState}
                            onChange={e => setContentState(e.target.value)}
                            fullWidth={true}
                        />
                    </TableCell>
                    <TableCell>
                        <Button onClick={() => props.customContact.id && submitEditCustomContact(props.customContact.id)} color="success">Submit</Button>
                        <Button onClick={() => props.setEditingCustomContact(-1)} color="error">Cancel</Button>
                    </TableCell>
                </TableRow>
            )}
        </>
    )
}