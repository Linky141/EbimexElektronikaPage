import { Grid, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/service/configureService";
import { useState } from "react";
import { fetchConfigurationAsync, setConfiguration, updateConfigurationAsync } from "./configurationSlice";
import RadioButtonGroup from "../../app/components/RadioButtonGroup";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import { FieldValues, useForm } from "react-hook-form";

export default function ConfigurationPage() {
    const dispatch = useAppDispatch();
    const { configuration } = useAppSelector(state => state.configuration);
    const { t } = useTranslation();
    const { handleSubmit, formState: { isSubmitting } } = useForm();
    const [loadingReset, setLoadingReset] = useState(false);

    async function init() {
        await dispatch(fetchConfigurationAsync());
    }

    function ResetSelected(info: boolean) {
        setLoadingReset(true);
        init().finally(() => {
            setLoadingReset(false);
            if (info)
                toast.info(t('settingsRestored'));
        })
    }

    async function submitForm(data: FieldValues) {
        try {
            data.infoEnabled = configuration!.infoEnabled;
            data.contactsEnabled = configuration!.contactsEnabled;
            data.servicesEnabled = configuration!.servicesEnabled;
            await dispatch(updateConfigurationAsync(data));
        } catch (error) {
            console.log(error);
        } finally {
            init();
        }
    }

    const statusItems = [
        { value: 0, label: t("everyone") },
        { value: 1, label: t("members") },
        { value: 2, label: t("disabled") }
    ];

    const statusItemsNoAll = [
        { value: 1, label: t("members") },
        { value: 2, label: t("disabled") }
    ];

    return (
        <Grid container>
            <Grid item xs={12} marginBottom={3}>
                <LoadingButton variant="outlined" color="success" style={{ width: '65%', margin: 5 }} loading={isSubmitting} onClick={handleSubmit(submitForm)}>{t('submit')}</LoadingButton>
                <LoadingButton variant="outlined" color="secondary" style={{ width: '25%', margin: 5 }} loading={loadingReset} onClick={() => ResetSelected(true)}>{t('reset')}</LoadingButton>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h4" marginBottom={1}>{t('accesses')}</Typography>
                <Grid container>
                    <Grid item xs={4}>
                        <Typography variant="h6">{t('info')}</Typography>
                        <RadioButtonGroup
                            options={statusItems}
                            selectedValue={configuration!.infoEnabled}
                            onChange={(e) =>
                                dispatch(setConfiguration({
                                    infoEnabled: parseInt(e.target.value),
                                    contactsEnabled: configuration!.contactsEnabled,
                                    servicesEnabled: configuration!.servicesEnabled
                                }))
                            }
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="h6">{t('contact')}</Typography>
                        <RadioButtonGroup
                            options={statusItems}
                            selectedValue={configuration!.contactsEnabled}
                            onChange={(e) =>
                                dispatch(setConfiguration({
                                    infoEnabled: configuration!.infoEnabled,
                                    contactsEnabled: parseInt(e.target.value),
                                    servicesEnabled: configuration!.servicesEnabled
                                }))
                            }
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="h6">{t('services')}</Typography>
                        <RadioButtonGroup
                            options={statusItemsNoAll}
                            selectedValue={configuration!.servicesEnabled}
                            onChange={(e) =>
                                dispatch(setConfiguration({
                                    infoEnabled: configuration!.infoEnabled,
                                    contactsEnabled: configuration!.contactsEnabled,
                                    servicesEnabled: parseInt(e.target.value)
                                }))
                            }
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid >
    )
}