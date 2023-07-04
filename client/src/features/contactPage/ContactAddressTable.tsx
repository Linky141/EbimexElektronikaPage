import { TableContainer, Table, TableBody } from "@mui/material";
import { Contact } from "../../app/models/contact";
import ContactAddressTableRow from "./ContactAddressTableRow";
import { Control, FieldValues } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface Props {
    editAddressMode: boolean;
    control: Control<FieldValues, any>;
    contact: Contact;
}

export default function ContactAddressTable({ editAddressMode, control, contact }: Props) {
    const { t } = useTranslation();
    
    return (
        <TableContainer>
            <Table>
                <TableBody>
                    <ContactAddressTableRow label={t("country")} content={contact.addressCountry} control={control} editaddressmode={editAddressMode} name="AddressCountry" />
                    <ContactAddressTableRow label={t("city")} content={contact.addressCity} control={control} editaddressmode={editAddressMode} name="AddressCity" />
                    <ContactAddressTableRow label={t("postalCode")} content={contact.addressPostal} control={control} editaddressmode={editAddressMode} name="AddressPostal" />
                    <ContactAddressTableRow label={t("street")} content={contact.addressStreet} control={control} editaddressmode={editAddressMode} name="AddressStreet" />
                    <ContactAddressTableRow label={t("buildingNumber")} content={contact.addressNumber1} control={control} editaddressmode={editAddressMode} name="AddressNumber1" />
                    <ContactAddressTableRow label={t("apartmentNumber")} content={contact.addressNumber2} control={control} editaddressmode={editAddressMode} name="AddressNumber2" />
                </TableBody>
            </Table>
        </TableContainer>

    )
}