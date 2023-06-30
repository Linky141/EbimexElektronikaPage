import { Contact, ContactCustom } from "../../app/models/contact";
import { Control, FieldValues } from "react-hook-form";
import ContactContactsTableShow from "./ContactContactsTableShow";
import ContactContactsTableEdit from "./ContactContactsTableEdit";

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

export default function ContactContactsTable(props: Props) {
    return (
        <>
            {!props.editContactsMode ? (
                <ContactContactsTableShow
                    addingNewCustomContact={props.addingNewCustomContact}
                    contact={props.contact}
                    customContacts={props.customContacts}
                    editContactsMode={props.editContactsMode}
                    editingCustomContact={props.editingCustomContact}
                    setCustomContacts={props.setCustomContacts}
                    setEditingCustomContact={props.setEditingCustomContact}
                />
            ) : (
                <ContactContactsTableEdit
                    contact={props.contact}
                    customContacts={props.customContacts}
                    editContactsMode={props.editContactsMode}
                    editingCustomContact={props.editingCustomContact}
                    setCustomContacts={props.setCustomContacts}
                    setEditingCustomContact={props.setEditingCustomContact}
                    addingNewCustomContact={props.addingNewCustomContact}
                    control={props.control}
                />
            )}
        </>
    )
}