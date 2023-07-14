import { Grid, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/service/configureService";
import { useState } from "react";
import agent from "../../app/api/agent";
import { setConfiguration } from "./configurationSlice";
import RadioButtonGroup from "../../app/components/RadioButtonGroup";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import { FieldValues, useForm } from "react-hook-form";

export default function ConfigurationPage() {
    const { configuration } = useAppSelector(state => state.configuration);
    const dispatch = useAppDispatch();
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [loadingReset, setLoadingReset] = useState(false);
    const { t } = useTranslation(); 
    const { handleSubmit } = useForm();

    function init() {
        return agent.Configuration.get()
            .then(configuration => dispatch(setConfiguration(configuration)))
            .catch(error => console.log(error))
    }

    function ResetSelected(info: boolean) {
        setLoadingReset(true);
        init().finally(() => {
            setLoadingReset(false);
            if (info)
                toast.info(t('settingsRestored'));
        })
    }

    function handleOnSubmit(data: FieldValues) {
        setLoadingSubmit(true);
        data.id = 1;
        data.infoEnabled = getConfig().infoEnabled;
        data.contactsEnabled = getConfig().contactsEnabled;
        data.servicesEnabled = getConfig().servicesEnabled;

        agent.Configuration
            .post(data)
            .catch(error => console.log(error))
            .finally(() => {
                init().finally(() => {
                    setLoadingSubmit(false);
                })
            });
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

    function getConfig() {
        return configuration!.find(x => x.id === 1)!;
    }

    return (
        <Grid container>
            <Grid item xs={12} marginBottom={3}>
                <LoadingButton variant="outlined" color="success" style={{width: '65%', margin: 5}}  loading={loadingSubmit} onClick={handleSubmit(handleOnSubmit)}>{t('submit')}</LoadingButton>
                <LoadingButton variant="outlined" color="secondary" style={{width: '25%', margin: 5}}   loading={loadingReset} onClick={() => ResetSelected(true)}>{t('reset')}</LoadingButton>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h4" marginBottom={1}>{t('accesses')}</Typography>
                <Grid container>
                    <Grid item xs={4}>
                        <Typography variant="h6">{t('info')}</Typography>
                        <RadioButtonGroup
                            options={statusItems}
                            selectedValue={getConfig().infoEnabled}
                            onChange={(e) =>
                                dispatch(setConfiguration([{
                                    id: 1,
                                    infoEnabled: parseInt(e.target.value),
                                    contactsEnabled: getConfig().contactsEnabled,
                                    servicesEnabled: getConfig().servicesEnabled
                                }]))
                            }
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="h6">{t('contact')}</Typography>
                        <RadioButtonGroup
                            options={statusItems}
                            selectedValue={getConfig().contactsEnabled}
                            onChange={(e) =>
                                dispatch(setConfiguration([{
                                    id: 1,
                                    infoEnabled: getConfig().infoEnabled,
                                    contactsEnabled: parseInt(e.target.value),
                                    servicesEnabled: getConfig().servicesEnabled
                                }]))
                            }
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="h6">{t('services')}</Typography>
                        <RadioButtonGroup
                            options={statusItemsNoAll}
                            selectedValue={getConfig().servicesEnabled}
                            onChange={(e) =>
                                dispatch(setConfiguration([{
                                    id: 1,
                                    infoEnabled: getConfig().infoEnabled,
                                    contactsEnabled: getConfig().contactsEnabled,
                                    servicesEnabled: parseInt(e.target.value)
                                }]))
                            }
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid >
    )
}