import { Grid } from "@mui/material";
import { Info } from "../../app/models/info";
import { useForm, FieldValues } from "react-hook-form";
import { useAppDispatch } from "../../app/service/configureService";
import { useState } from "react";
import agent from "../../app/api/agent";
import { setInfos } from "./infoSlice";
import InfoOpenedHoursShow from "./InfoOpenedHoursShow";
import InfoOpenedHoursEdit from "./InfoOpenedHoursEdit";
import { yupResolver } from '@hookform/resolvers/yup';
import {  OpenHoursSchema } from "../Validations/InfoPageValidations";

interface Props {
    info: Info;
}

export default function InfoOpenedHours(props: Props) {
    const { control, handleSubmit, setValue } = useForm<any>({
        resolver: yupResolver(OpenHoursSchema())
    });
    const dispatch = useAppDispatch();
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [editingOpenedHoursMode, setEditingOpenedHoursMode] = useState(false);

    function handleOnSubmitOpenHours(data: FieldValues) {
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
                        handleOnSubmitOpenHours={handleOnSubmitOpenHours}
                        handleSubmit={handleSubmit}
                        info={props.info}
                        loadingSubmit={loadingSubmit}
                        setEditingOpenedHoursMode={setEditingOpenedHoursMode}
                        control={control}
                        setValue={setValue}
                    />
                )}
            </Grid>
        </>
    )
}