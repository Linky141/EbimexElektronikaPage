import { Grid, Typography, Button, TableContainer, Table, TableBody } from "@mui/material";
import InfoOpenedHoursTableRow from "./InfoOpenedHoursTableRow";
import { Info } from "../../app/models/info";
import { Control, UseFormSetValue } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface Props {
    info: Info;
    setEditingOpenedHoursMode: React.Dispatch<React.SetStateAction<boolean>>;
    control: Control<any>;
    setValue: UseFormSetValue<any>;
}

export default function InfoOpenedHoursShow(props: Props) {
    const { t } = useTranslation();

    return (
        <Grid container>
            <Grid item>
                <Typography variant="h4">{t("openHours")}</Typography>
            </Grid>
            <Grid item>
                <Button onClick={() => props.setEditingOpenedHoursMode(true)}>{t("edit")}</Button>
            </Grid>
            <Grid item xs={12}>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <InfoOpenedHoursTableRow setValue={props.setValue} nameStart="OpeningHoursMondayStart" nameEnd="OpeningHoursMondayEnd" control={props.control} day={t("monday")} open={props.info.openingHoursMondayStart} close={props.info.openingHoursMondayEnd} editMode={false} />
                            <InfoOpenedHoursTableRow setValue={props.setValue} nameStart="OpeningHoursTuesdayStart" nameEnd="OpeningHoursTuesdayEnd" control={props.control} day={t("tuesday")} open={props.info.openingHoursTuesdayStart} close={props.info.openingHoursTuesdayEnd} editMode={false} />
                            <InfoOpenedHoursTableRow setValue={props.setValue} nameStart="OpeningHoursWednesdayStart" nameEnd="OpeningHoursWednesdayEnd" control={props.control} day={t("wednesday")} open={props.info.openingHoursWednesdayStart} close={props.info.openingHoursWednesdayEnd} editMode={false} />
                            <InfoOpenedHoursTableRow setValue={props.setValue} nameStart="OpeningHoursThursdayStart" nameEnd="OpeningHoursThursdayEnd" control={props.control} day={t("thursday")} open={props.info.openingHoursThursdayStart} close={props.info.openingHoursThursdayEnd} editMode={false} />
                            <InfoOpenedHoursTableRow setValue={props.setValue} nameStart="OpeningHoursFridayStart" nameEnd="OpeningHoursFridayEnd" control={props.control} day={t("friday")} open={props.info.openingHoursFridayStart} close={props.info.openingHoursFridayEnd} editMode={false} />
                            <InfoOpenedHoursTableRow setValue={props.setValue} nameStart="OpeningHoursSaturdayStart" nameEnd="OpeningHoursSaturdayEnd" control={props.control} day={t("saturday")} open={props.info.openingHoursSaturdayStart} close={props.info.openingHoursSaturdayEnd} editMode={false} />
                            <InfoOpenedHoursTableRow setValue={props.setValue} nameStart="OpeningHoursSundayStart" nameEnd="OpeningHoursSundayEnd" control={props.control} day={t("sunday")} open={props.info.openingHoursSundayStart} close={props.info.openingHoursSundayEnd} editMode={false} />
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    )
}