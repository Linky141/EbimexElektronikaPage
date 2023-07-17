import { Grid, Typography, Button, TableContainer, Table, TableBody } from "@mui/material";
import InfoOpenedHoursTableRow from "./InfoOpenedHoursTableRow";
import { FieldValues, useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "../../app/service/configureService";
import { OpenHoursSchema } from "../Validations/InfoPageValidations";
import { updateOpenHoursAsync } from "./infoSlice";
import LoadingComponent from "../../app/layout/LoadingComponent";

interface Props {
    setEditingOpenedHoursMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function InfoOpenedHoursEdit(props: Props) {
    const dispatch = useAppDispatch();
    const { control, handleSubmit, setValue, formState: { isSubmitting } } = useForm<any>({
        resolver: yupResolver(OpenHoursSchema())
    });
    const { t } = useTranslation();
    const { info } = useAppSelector(state => state.info);

    async function submitForm(data: FieldValues) {
        console.log(data);
        try {
            data.Id = 1;
            await dispatch(updateOpenHoursAsync(data));
        } catch (error) {
            console.log(error);
        } finally {
            props.setEditingOpenedHoursMode(false);
        }
    }

    if (!info)
        return <LoadingComponent />;

    return (
        <Grid container>
            <Grid item>
                <Typography variant="h4">{t("openHours")}</Typography>
            </Grid>
            <Grid item>
                <LoadingButton
                    loading={isSubmitting}
                    onClick={handleSubmit(submitForm)}
                    color="success"
                >{t("submit")}</LoadingButton>
                <Button
                    onClick={() => props.setEditingOpenedHoursMode(false)}
                    color="error"
                >{t("cancel")}</Button>
            </Grid>
            <Grid item xs={12}>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <InfoOpenedHoursTableRow setValue={setValue} nameStart="OpeningHoursMondayStart" nameEnd="OpeningHoursMondayEnd" control={control} day={t("monday")} open={info.openingHoursMondayStart} close={info.openingHoursMondayEnd} editMode={true} />
                            <InfoOpenedHoursTableRow setValue={setValue} nameStart="OpeningHoursTuesdayStart" nameEnd="OpeningHoursTuesdayEnd" control={control} day={t("tuesday")} open={info.openingHoursTuesdayStart} close={info.openingHoursTuesdayEnd} editMode={true} />
                            <InfoOpenedHoursTableRow setValue={setValue} nameStart="OpeningHoursWednesdayStart" nameEnd="OpeningHoursWednesdayEnd" control={control} day={t("wednesday")} open={info.openingHoursWednesdayStart} close={info.openingHoursWednesdayEnd} editMode={true} />
                            <InfoOpenedHoursTableRow setValue={setValue} nameStart="OpeningHoursThursdayStart" nameEnd="OpeningHoursThursdayEnd" control={control} day={t("thursday")} open={info.openingHoursThursdayStart} close={info.openingHoursThursdayEnd} editMode={true} />
                            <InfoOpenedHoursTableRow setValue={setValue} nameStart="OpeningHoursFridayStart" nameEnd="OpeningHoursFridayEnd" control={control} day={t("friday")} open={info.openingHoursFridayStart} close={info.openingHoursFridayEnd} editMode={true} />
                            <InfoOpenedHoursTableRow setValue={setValue} nameStart="OpeningHoursSaturdayStart" nameEnd="OpeningHoursSaturdayEnd" control={control} day={t("saturday")} open={info.openingHoursSaturdayStart} close={info.openingHoursSaturdayEnd} editMode={true} />
                            <InfoOpenedHoursTableRow setValue={setValue} nameStart="OpeningHoursSundayStart" nameEnd="OpeningHoursSundayEnd" control={control} day={t("sunday")} open={info.openingHoursSundayStart} close={info.openingHoursSundayEnd} editMode={true} />
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    )
}