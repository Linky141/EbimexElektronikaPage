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

export default function ContactAddressTable(props: Props) {
    const { t } = useTranslation();

    return (
        <TableContainer>
            <Table>
                <TableBody>
                    <ContactAddressTableRow label={t("country")} content={props.contact.addressCountry} control={props.control} editaddressmode={props.editAddressMode} name="AddressCountry" />
                    <ContactAddressTableRow label={t("city")} content={props.contact.addressCity} control={props.control} editaddressmode={props.editAddressMode} name="AddressCity" />
                    <ContactAddressTableRow label={t("postalCode")} content={props.contact.addressPostal} control={props.control} editaddressmode={props.editAddressMode} name="AddressPostal" />
                    <ContactAddressTableRow label={t("street")} content={props.contact.addressStreet} control={props.control} editaddressmode={props.editAddressMode} name="AddressStreet" />
                    <ContactAddressTableRow label={t("buildingNumber")} content={props.contact.addressNumber1} control={props.control} editaddressmode={props.editAddressMode} name="AddressNumber1" />
                    <ContactAddressTableRow label={t("apartmentNumber")} content={props.contact.addressNumber2} control={props.control} editaddressmode={props.editAddressMode} name="AddressNumber2" />
                </TableBody>
            </Table>
        </TableContainer>

    )
}