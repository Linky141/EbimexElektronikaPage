import { TableContainer, Table, TableBody } from "@mui/material";
import { Contact } from "../../app/models/contact";
import ContactAddressTableRow from "./ContactAddressTableRow";
import { Control, FieldValues } from "react-hook-form";

interface Props {
    editAddressMode: boolean;
    control: Control<FieldValues, any>;
    contact: Contact;
}

export default function ContactAddressTable({ editAddressMode, control, contact }: Props) {

    return (
        <TableContainer>
            <Table>
                <TableBody>
                    <ContactAddressTableRow label="Country" content={contact.addressCountry} control={control} editaddressmode={editAddressMode} name="AddressCountry" />
                    <ContactAddressTableRow label="City" content={contact.addressCity} control={control} editaddressmode={editAddressMode} name="AddressCity" />
                    <ContactAddressTableRow label="Postal code" content={contact.addressPostal} control={control} editaddressmode={editAddressMode} name="AddressPostal" />
                    <ContactAddressTableRow label="Street" content={contact.addressStreet} control={control} editaddressmode={editAddressMode} name="AddressStreet" />
                    <ContactAddressTableRow label="Building number" content={contact.addressNumber1} control={control} editaddressmode={editAddressMode} name="AddressNumber1" />
                    <ContactAddressTableRow label="Apartment number" content={contact.addressNumber2} control={control} editaddressmode={editAddressMode} name="AddressNumber2" />
                </TableBody>
            </Table>
        </TableContainer>

    )
}