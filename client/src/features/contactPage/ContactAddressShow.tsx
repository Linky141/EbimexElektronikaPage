import { Grid, Typography, Button } from "@mui/material";
import { Contact } from "../../app/models/contact";
import ContactAddressTable from "./ContactAddressTable";
import { Control, FieldValues } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../app/service/configureService";

interface Props {
    contact: Contact;
    setEditAddressMode: React.Dispatch<React.SetStateAction<boolean>>;
    control: Control<FieldValues, any>;
    editAddressMode: boolean;
}

export default function ContactAddressShow(props: Props) {
    const { t } = useTranslation();
    const { user } = useAppSelector(state => state.account);

    return (
        <Grid container>
            <Grid item>
                <Typography variant="h4">{t("address")}</Typography>
            </Grid>
            {user && user.roles?.includes('Admin') &&
                <Grid item>
                    <Button onClick={() => props.setEditAddressMode(true)}>{t("edit")}</Button>
                </Grid>
            }
            <ContactAddressTable
                contact={props.contact}
                control={props.control}
                editAddressMode={props.editAddressMode}
            />
        </Grid>
    )
}