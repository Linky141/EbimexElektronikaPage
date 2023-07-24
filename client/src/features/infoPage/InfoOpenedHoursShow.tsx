import { Grid, Typography, Button, TableContainer, Table, TableBody } from "@mui/material";
import InfoOpenedHoursTableRow from "./InfoOpenedHoursTableRow";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../app/service/configureService";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { isAdmin } from "../../app/utils/RolesUtils";

interface Props {
    setEditingOpenedHoursMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function InfoOpenedHoursShow(props: Props) {
    const { t } = useTranslation();
    const { user } = useAppSelector(state => state.account);
    const { info } = useAppSelector(state => state.info);

    if (!info)
        return <LoadingComponent />;

    return (
        <Grid container>
            <Grid item>
                <Typography variant="h4">{t("openHours")}</Typography>
            </Grid>
            {isAdmin(user) &&
                <Grid item>
                    <Button onClick={() => props.setEditingOpenedHoursMode(true)}>{t("edit")}</Button>
                </Grid>
            }
            <Grid item xs={12}>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <InfoOpenedHoursTableRow nameStart="OpeningHoursMondayStart" nameEnd="OpeningHoursMondayEnd" day={t("monday")} open={info.openingHoursMondayStart} close={info.openingHoursMondayEnd} editMode={false} />
                            <InfoOpenedHoursTableRow nameStart="OpeningHoursTuesdayStart" nameEnd="OpeningHoursTuesdayEnd" day={t("tuesday")} open={info.openingHoursTuesdayStart} close={info.openingHoursTuesdayEnd} editMode={false} />
                            <InfoOpenedHoursTableRow nameStart="OpeningHoursWednesdayStart" nameEnd="OpeningHoursWednesdayEnd" day={t("wednesday")} open={info.openingHoursWednesdayStart} close={info.openingHoursWednesdayEnd} editMode={false} />
                            <InfoOpenedHoursTableRow nameStart="OpeningHoursThursdayStart" nameEnd="OpeningHoursThursdayEnd" day={t("thursday")} open={info.openingHoursThursdayStart} close={info.openingHoursThursdayEnd} editMode={false} />
                            <InfoOpenedHoursTableRow nameStart="OpeningHoursFridayStart" nameEnd="OpeningHoursFridayEnd" day={t("friday")} open={info.openingHoursFridayStart} close={info.openingHoursFridayEnd} editMode={false} />
                            <InfoOpenedHoursTableRow nameStart="OpeningHoursSaturdayStart" nameEnd="OpeningHoursSaturdayEnd" day={t("saturday")} open={info.openingHoursSaturdayStart} close={info.openingHoursSaturdayEnd} editMode={false} />
                            <InfoOpenedHoursTableRow nameStart="OpeningHoursSundayStart" nameEnd="OpeningHoursSundayEnd" day={t("sunday")} open={info.openingHoursSundayStart} close={info.openingHoursSundayEnd} editMode={false} />
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    )
}