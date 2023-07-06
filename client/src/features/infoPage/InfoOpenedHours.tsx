import { Grid } from "@mui/material";
import { Info } from "../../app/models/info";
import { useForm, FieldValues } from "react-hook-form";
import { useAppDispatch } from "../../app/service/configureService";
import { useState } from "react";
import agent from "../../app/api/agent";
import { setInfos } from "./infoSlice";
import InfoOpenedHoursShow from "./InfoOpenedHoursShow";
import InfoOpenedHoursEdit from "./InfoOpenedHoursEdit";
import { object, string } from "yup";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

interface Props {
    info: Info;
}

export default function InfoOpenedHours(props: Props) {
    const { control, handleSubmit, setValue } = useForm();
    const dispatch = useAppDispatch();
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [editingOpenedHoursMode, setEditingOpenedHoursMode] = useState(false);
    const { t } = useTranslation();

    async function validate(data: FieldValues) {
        let sc = string().required();
        let error = '';

        if (!await sc.isValid(data.OpeningHoursMondayStart))
            error += t("monday") + ' ' + t("from") + ' ' + t("isMandatory") + '\n';
        if (!await sc.isValid(data.OpeningHoursMondayEnd))
            error += t("monday") + ' ' + t("to") + ' ' + t("isMandatory") + '\n';
        if (!await sc.isValid(data.OpeningHoursTuesdayStart))
            error += t("tuesday") + ' ' + t("from") + ' ' + t("isMandatory") + '\n';
        if (!await sc.isValid(data.OpeningHoursTuesdayEnd))
            error += t("tuesday") + ' ' + t("to") + ' ' + t("isMandatory") + '\n';
        if (!await sc.isValid(data.OpeningHoursWednesdayStart))
            error += t("wednesday") + ' ' + t("from") + ' ' + t("isMandatory") + '\n';
        if (!await sc.isValid(data.OpeningHoursWednesdayEnd))
            error += t("wednesday") + ' ' + t("to") + ' ' + t("isMandatory") + '\n';
        if (!await sc.isValid(data.OpeningHoursThursdayStart))
            error += t("thursday") + ' ' + t("from") + ' ' + t("isMandatory") + '\n';
        if (!await sc.isValid(data.OpeningHoursThursdayEnd))
            error += t("thursday") + ' ' + t("to") + ' ' + t("isMandatory") + '\n';
        if (!await sc.isValid(data.OpeningHoursFridayStart))
            error += t("friday") + ' ' + t("from") + ' ' + t("isMandatory") + '\n';
        if (!await sc.isValid(data.OpeningHoursFridayEnd))
            error += t("friday") + ' ' + t("to") + ' ' + t("isMandatory") + '\n';
        if (!await sc.isValid(data.OpeningHoursSaturdayStart))
            error += t("saturday") + ' ' + t("from") + ' ' + t("isMandatory") + '\n';
        if (!await sc.isValid(data.OpeningHoursSaturdayEnd))
            error += t("saturday") + ' ' + t("to") + ' ' + t("isMandatory") + '\n';
        if (!await sc.isValid(data.OpeningHoursSundayStart))
            error += t("sunday") + ' ' + t("from") + ' ' + t("isMandatory") + '\n';
        if (!await sc.isValid(data.OpeningHoursSundayEnd))
            error += t("sunday") + ' ' + t("to") + ' ' + t("isMandatory") + '\n';
        if (error === '') {
            return true;
        }
        else {
            toast.error(error);
            return false;
        }
    }

    function handleOnSubmitOpenHours(data: FieldValues) {
        let validated = false;
        validate(data)
            .then(state => validated = state)
            .finally(() => {
                if (validated) {
                    setLoadingSubmit(true);
                    data.Id = 1;
                    agent.Info
                        .UpdateOpenHours(data)
                        .then(infos => dispatch(setInfos(infos)))
                        .catch(error => console.log(error))
                        .finally(() => {
                            setLoadingSubmit(false);
                            setEditingOpenedHoursMode(false);
                        });
                }
            });
    }
    
    return (
        <>
            <Grid item xs={12}>
                {!editingOpenedHoursMode ? (
                    <InfoOpenedHoursShow
                        info={props.info}
                        setEditingOpenedHoursMode={setEditingOpenedHoursMode}
                        control={control}
                        setValue={setValue}
                    />
                ) : (
                    <InfoOpenedHoursEdit
                        control={control}
                        handleOnSubmitOpenHours={handleOnSubmitOpenHours}
                        handleSubmit={handleSubmit}
                        info={props.info}
                        loadingSubmit={loadingSubmit}
                        setEditingOpenedHoursMode={setEditingOpenedHoursMode}
                        setValue={setValue}
                    />
                )}
            </Grid>
        </>
    )
}