import { Button, TableContainer, Table, TableBody, TableCell, TableRow, TextField } from "@mui/material";
import { useState } from "react";
import { ContactCustom } from "../../app/models/contact";

interface Props {
    customContacts: ContactCustom[];
    setCustomContacts: React.Dispatch<React.SetStateAction<ContactCustom[]>>;
    setaddingNewCustomContact: React.Dispatch<React.SetStateAction<boolean>>;
    editingCustomContact: number;
    addingNewCustomContact: boolean;
}

export default function ContactContactsEditAddingNewEntry(props: Props) {
    const [newNameState, setNewNameState] = useState<string>('');
    const [newContentState, setNewContentState] = useState<string>('');

    function handleAddNewCustomContact(name: string, content: string) {
        const lastItem = props.customContacts.length > 0 ? props.customContacts[props.customContacts.length - 1] : undefined;
        const newItemId = lastItem && lastItem.id ? lastItem.id + 1 : 0;
        const newItem: ContactCustom = { id: newItemId, name: newNameState, content: newContentState }
        props.setCustomContacts(prevState => {
            return [...prevState, newItem]
        })
        props.setaddingNewCustomContact(false);
        setNewNameState('');
        setNewContentState('');
    }

    function handleCancelAddNewCustomContact() {
        props.setaddingNewCustomContact(false);
        setNewNameState('');
        setNewContentState('');
    }

    return (
        <>
            {props.editingCustomContact === -1 ? (
                <>
                    {!props.addingNewCustomContact ? (
                        <Button onClick={() => props.setaddingNewCustomContact(true)}>Add new contact option</Button>
                    ) : (
                        <>
                            <TableContainer>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell width="30%">
                                                <TextField
                                                    label="Contact name"
                                                    fullWidth
                                                    value={newNameState}
                                                    onChange={e => setNewNameState(e.target.value)}
                                                />
                                            </TableCell>
                                            <TableCell width="55%">
                                                <TextField
                                                    label="Contact data"
                                                    fullWidth
                                                    value={newContentState}
                                                    onChange={e => setNewContentState(e.target.value)}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Button color="success" onClick={() => handleAddNewCustomContact(newNameState, newContentState)}>Submit</Button>
                                                <Button color="error" onClick={handleCancelAddNewCustomContact}>Cancel</Button>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </>
                    )}
                </>
            ) : (
                <></>
            )}
        </>
    )
}