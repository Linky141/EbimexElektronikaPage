import { Button, TableCell, TableRow, TextField } from "@mui/material";
import { useState } from "react";
import { ContactCustom } from "../../app/models/contact";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

interface Props {
    editingCustomContact: number;
    setEditingCustomContact: (state: number) => void;
    addingNewCustomContact: boolean;
    customContact: ContactCustom;
    customContacts: ContactCustom[];
    setCustomContacts: (contact: ContactCustom[]) => void;
}

export default function ContactContactsTableCustomsRow(props: Props) {
    const { t } = useTranslation();
    const [nameState, setNameState] = useState<string>(props.customContact.name);
    const [contentState, setContentState] = useState<string>(props.customContact.content);

    function submitEditCustomContact(id: number, name: string, content: string) {
        const tmp: ContactCustom[] = props.customContacts.map(contact => {
            if (contact.id === id)
                return { id: id, name: nameState, content: contentState };
            else
                return contact;
        });

        props.setCustomContacts(tmp);
        props.setEditingCustomContact(-1);
    }

    function submitRemoveCustomContact(id: number) {
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
                                <Button onClick={() => props.setEditingCustomContact(props.customContact.id)}>{t("edit")}</Button>
                                <Button onClick={() => submitRemoveCustomContact(props.customContact.id)} color="error" variant="outlined">{t("delete")}</Button>
                            </>
                        ) : (<></>)}

                    </TableCell>
                </TableRow>
            ) : (
                <TableRow>
                    <TableCell width="30%">
                        <TextField
                            label={t("contactName")}
                            value={nameState}
                            onChange={e => setNameState(e.target.value)}
                            fullWidth={true}
                        />
                    </TableCell>
                    <TableCell width="55%">
                        <TextField
                            label={t("contactData")}
                            value={contentState}
                            onChange={e => setContentState(e.target.value)}
                            fullWidth={true}
                        />
                    </TableCell>
                    <TableCell>
                        <Button onClick={() => {
                            if (nameState === '' || contentState === '') {
                                toast.error(t("nameAndContantAreMandatory"))
                            }
                            else {
                                submitEditCustomContact(props.customContact.id, nameState, contentState);
                            }
                        }} color="success">{t("save")}</Button>
                        <Button onClick={() => props.setEditingCustomContact(-1)} color="error">{t("cancel")}</Button>
                    </TableCell>
                </TableRow>
            )}
        </>
    )
}