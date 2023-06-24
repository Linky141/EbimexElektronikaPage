import { Button, TableCell, TableRow, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { ContactCustom } from "../../app/models/contact";

interface Props {
    editingCustomContact: number;
    setEditingCustomContact: (state: number) => void;
    addingNewCustomContact: boolean;
    customContact: ContactCustom;
}

export default function ContactContactsTableCustomsRow({ editingCustomContact, addingNewCustomContact, setEditingCustomContact, customContact }: Props) {
    const [nameData, setNameData] = useState<string>();
    const [contentData, setContentData] = useState<string>();

    useEffect(() => {
        setNameData(customContact.name);
        setContentData(customContact.content);
    }, [customContact.content, customContact.name]);

    return (
        <>
            {!(editingCustomContact === customContact.id) ? (
                <TableRow>
                    <TableCell width="30%">{customContact.name}</TableCell>
                    <TableCell width="54%">{customContact.content}</TableCell>
                    <TableCell>
                        {(editingCustomContact === -1 && !addingNewCustomContact) ? (
                            <>
                                <Button onClick={() => setEditingCustomContact(customContact.id)}>Edit</Button>
                                <Button color="error" variant="outlined">Delete</Button>
                            </>
                        ) : (<></>)}

                    </TableCell>
                </TableRow>
            ) : (
                <TableRow>
                    <TableCell width="30%">
                        <TextField
                            value={nameData}
                            onChange={e => setNameData(e.target.value)}
                            label="Contact name"
                            fullWidth
                        />
                    </TableCell>
                    <TableCell width="55%">
                        <TextField
                            value={contentData}
                            onChange={e => setContentData(e.target.value)}
                            label="Contact data"
                            fullWidth
                        />
                    </TableCell>
                    <TableCell>
                        <Button color="success">Submit</Button>
                        <Button onClick={() => setEditingCustomContact(-1)} color="error">Cancel</Button>
                    </TableCell>
                </TableRow>
            )}
        </>
    )
}