import { TableContainer, Table, TableBody } from "@mui/material";
import { Contact } from "../../app/models/contact";
import ContactAddressTableRow from "./ContactAddressTableRow";
import { useState } from "react";
import { UseControllerProps } from "react-hook-form";

interface Props {
    contact: Contact;
    editAddressMode: boolean;
}

export default function ContactAddressTable({ contact, editAddressMode }: Props) {

    return (
        <TableContainer>
            <Table>
                <TableBody>
                    <ContactAddressTableRow fieldName="Country" fieldValue={contact.addressCountry} editAddressMode={editAddressMode} />
                    <ContactAddressTableRow fieldName="City" fieldValue={contact.addressCity} editAddressMode={editAddressMode} />
                    <ContactAddressTableRow fieldName="Postal code" fieldValue={contact.addressPostal} editAddressMode={editAddressMode} />
                    <ContactAddressTableRow fieldName="Street" fieldValue={contact.addressStreet} editAddressMode={editAddressMode} />
                    <ContactAddressTableRow fieldName="Building number" fieldValue={contact.addressNumber1} editAddressMode={editAddressMode} />
                    <ContactAddressTableRow fieldName="Apartment number" fieldValue={contact.addressNumber2} editAddressMode={editAddressMode} />
                </TableBody>
            </Table>
        </TableContainer>

    )
}