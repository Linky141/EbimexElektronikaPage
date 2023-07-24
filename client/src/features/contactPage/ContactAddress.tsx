import { Button, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { t } from "i18next";
import { useAppDispatch, useAppSelector } from "../../app/service/configureService";
import ContactAddressTable from "./ContactAddressTable";
import { LoadingButton } from "@mui/lab";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { FieldValues, useForm } from "react-hook-form";
import { updateContactAddress } from "./contactSlice";
import { isAdmin } from "../../app/utils/RolesUtils";

export default function ContactAddress() {
    const dispatch = useAppDispatch();
    const { control, handleSubmit, formState: { isSubmitting } } = useForm();
    const { user } = useAppSelector(state => state.account);
    const { contact } = useAppSelector(state => state.contact);
    const [editAddressMode, setEditAddressMode] = useState(false);

    async function submitForm(data: FieldValues) {
        try {
            await dispatch(updateContactAddress(data));
        } catch (error) {
            console.log(error);
        } finally {
            setEditAddressMode(false);
        }
    }

    if (!contact)
        return <LoadingComponent />

    return (
        <Grid item xs={12}>
            {!editAddressMode ? (
                <Grid container>
                    <Grid item>
                        <Typography variant="h4">{t("address")}</Typography>
                    </Grid>
                    {isAdmin(user) &&
                        <Grid item>
                            <Button onClick={() => setEditAddressMode(true)}>{t("edit")}</Button>
                        </Grid>
                    }
                </Grid>
            ) : (
                <Grid container>
                    <Grid item>
                        <Typography variant="h4">{t("address")}</Typography>
                    </Grid>
                    <Grid item>
                        <LoadingButton
                            loading={isSubmitting}
                            onClick={handleSubmit(submitForm)}
                            color="success"
                        >{t("save")}</LoadingButton>
                        <Button onClick={() => setEditAddressMode(false)} color="error">{t("cancel")}</Button>
                    </Grid>
                </Grid>
            )}
            <ContactAddressTable
                contact={contact}
                control={control}
                editAddressMode={editAddressMode}
            />
        </Grid>
    )
}