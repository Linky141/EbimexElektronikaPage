import { Button, TableCell, TableRow, TextField } from "@mui/material";
import { useState } from "react";

interface Props {
    editingCustomContact: number;
    setEditingCustomContact: (state: number) => void;
    addingNewCustomContact: boolean;
    customContact: [number, string, string];
    customContacts: [number, string, string][];
    setCustomContacts: (contact: [number, string, string][]) => void;
}

export default function ContactContactsTableCustomsRow(props: Props) {
    const [nameState, setNameState] = useState<string> (props.customContact[1]);
    const [contentState, setContentState] = useState<string> (props.customContact[2]);

    function submitEditCustomContact(id: number, name: string, content: string) {
        const tmp: [number, string, string][] = props.customContacts.map(contact => {
            if (contact[0] === id) 
              return [id, name, content];
            else 
              return contact;
          });

          props.setCustomContacts(tmp);
          props.setEditingCustomContact(-1);
    }

    function removeCustomContact(id: number){
        props.setCustomContacts(
            props.customContacts.filter(a =>
              a[0] !== id
            )
          );
    }

    return (
        <>
            {!(props.editingCustomContact === props.customContact[0]) ? (
                <TableRow>
                    <TableCell width="30%">{props.customContact[1]}</TableCell>
                    <TableCell width="54%">{props.customContact[2]}</TableCell>
                    <TableCell>
                        {(props.editingCustomContact === -1 && !props.addingNewCustomContact) ? (
                            <>
                                <Button onClick={() => props.setEditingCustomContact(props.customContact[0])}>Edit</Button>
                                <Button onClick={() => removeCustomContact(props.customContact[0])} color="error" variant="outlined">Delete</Button>
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
                        <Button onClick={() => submitEditCustomContact(props.customContact[0], nameState, contentState)} color="success">Submit</Button>
                        <Button onClick={() => props.setEditingCustomContact(-1)} color="error">Cancel</Button>
                    </TableCell>
                </TableRow>
            )}
        </>
    )
}