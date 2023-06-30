import { Grid, Typography, Button, TableContainer, Table, TableBody } from "@mui/material";
import InfoOpenedHoursTableRow from "./InfoOpenedHoursTableRow";
import { Info } from "../../app/models/info";
import { FieldValues, Control, UseFormSetValue, UseFormHandleSubmit } from "react-hook-form";
import { LoadingButton } from "@mui/lab";

interface Props {
    info: Info;
    setEditingOpenedHoursMode: React.Dispatch<React.SetStateAction<boolean>>;
    control: Control<FieldValues, any>;
    setValue: UseFormSetValue<FieldValues>;
    loadingSubmit: boolean;
    handleSubmit: UseFormHandleSubmit<FieldValues, undefined>;
    handleOnSubmitOpenHours: (data: FieldValues) => void;
}

export default function InfoOpenedHoursEdit(props: Props) {

    return (
        <Grid container>
            <Grid item>
                <Typography variant="h4">Open hours</Typography>
            </Grid>
            <Grid item>
                <LoadingButton loading={props.loadingSubmit} onClick={props.handleSubmit(props.handleOnSubmitOpenHours)} color="success">Submit</LoadingButton>
                <Button onClick={() => props.setEditingOpenedHoursMode(false)} color="error">Cancel</Button>
            </Grid>
            <Grid item xs={12}>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <InfoOpenedHoursTableRow setValue={props.setValue} nameStart="OpeningHoursMondayStart" nameEnd="OpeningHoursMondayEnd" control={props.control} day={"Monday"} open={props.info.openingHoursMondayStart} close={props.info.openingHoursMondayEnd} editMode={true} />
                            <InfoOpenedHoursTableRow setValue={props.setValue} nameStart="OpeningHoursTuesdayStart" nameEnd="OpeningHoursTuesdayEnd" control={props.control} day={"Tuesday"} open={props.info.openingHoursTuesdayStart} close={props.info.openingHoursTuesdayEnd} editMode={true} />
                            <InfoOpenedHoursTableRow setValue={props.setValue} nameStart="OpeningHoursWednesdayStart" nameEnd="OpeningHoursWednesdayEnd" control={props.control} day={"Wednesday"} open={props.info.openingHoursWednesdayStart} close={props.info.openingHoursWednesdayEnd} editMode={true} />
                            <InfoOpenedHoursTableRow setValue={props.setValue} nameStart="OpeningHoursThursdayStart" nameEnd="OpeningHoursThursdayEnd" control={props.control} day={"Thursday"} open={props.info.openingHoursThursdayStart} close={props.info.openingHoursThursdayEnd} editMode={true} />
                            <InfoOpenedHoursTableRow setValue={props.setValue} nameStart="OpeningHoursFridayStart" nameEnd="OpeningHoursFridayEnd" control={props.control} day={"Friday"} open={props.info.openingHoursFridayStart} close={props.info.openingHoursFridayEnd} editMode={true} />
                            <InfoOpenedHoursTableRow setValue={props.setValue} nameStart="OpeningHoursSaturdayStart" nameEnd="OpeningHoursSaturdayEnd" control={props.control} day={"Saturday"} open={props.info.openingHoursSaturdayStart} close={props.info.openingHoursSaturdayEnd} editMode={true} />
                            <InfoOpenedHoursTableRow setValue={props.setValue} nameStart="OpeningHoursSundayStart" nameEnd="OpeningHoursSundayEnd" control={props.control} day={"Sunday"} open={props.info.openingHoursSundayStart} close={props.info.openingHoursSundayEnd} editMode={true} />
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    )
}