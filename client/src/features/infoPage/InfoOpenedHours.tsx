import { Grid, Typography, Button, TableContainer, Table, TableBody } from "@mui/material";
import InfoOpenedHoursTableRow from "./InfoOpenedHoursTableRow";
import { Info } from "../../app/models/info";

interface Props {
    editingOpenedHoursMode: boolean;
    setEditingOpenedHoursMode: (state: boolean) => void;
    info: Info;
}

export default function InfoOpenedHours({ editingOpenedHoursMode, setEditingOpenedHoursMode, info}: Props) {

    return (
        <>
            <Grid item xs={12}>
                {!editingOpenedHoursMode ? (
                    <Grid container>
                        <Grid item>
                            <Typography variant="h4">Open hours</Typography>
                        </Grid>
                        <Grid item>
                            <Button onClick={() => setEditingOpenedHoursMode(true)}>Edit</Button>
                        </Grid>
                        <Grid item xs={12}>
                            <TableContainer>
                                <Table>
                                    <TableBody>
                                        <InfoOpenedHoursTableRow day={"Monday"} open={info.openingHoursMondayStart} close={info.openingHoursMondayEnd} editMode={false} />
                                        <InfoOpenedHoursTableRow day={"Tuesday"} open={info.openingHoursTuesdayStart} close={info.openingHoursTuesdayEnd} editMode={false} />
                                        <InfoOpenedHoursTableRow day={"Wednesday"} open={info.openingHoursWednesdayStart} close={info.openingHoursWednesdayEnd} editMode={false} />
                                        <InfoOpenedHoursTableRow day={"Thursday"} open={info.openingHoursThursdayStart} close={info.openingHoursThursdayEnd} editMode={false} />
                                        <InfoOpenedHoursTableRow day={"Friday"} open={info.openingHoursFridayStart} close={info.openingHoursFridayEnd} editMode={false} />
                                        <InfoOpenedHoursTableRow day={"Saturday"} open={info.openingHoursSaturdayStart} close={info.openingHoursSaturdayEnd} editMode={false} />
                                        <InfoOpenedHoursTableRow day={"Sunday"} open={info.openingHoursSundayStart} close={info.openingHoursSundayEnd} editMode={false} />
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                ) : (
                    <form>
                        <Grid container>
                            <Grid item>
                                <Typography variant="h4">Open hours</Typography>
                            </Grid>
                            <Grid item>
                                <Button type="submit" color="success">Submit</Button>
                                <Button onClick={() => setEditingOpenedHoursMode(false)} color="error">Cancel</Button>
                            </Grid>
                            <Grid item xs={12}>
                                <TableContainer>
                                    <Table>
                                        <TableBody>
                                            <InfoOpenedHoursTableRow day={"Monday"} open={info.openingHoursMondayStart} close={info.openingHoursMondayEnd} editMode={true} />
                                            <InfoOpenedHoursTableRow day={"Tuesday"} open={info.openingHoursTuesdayStart} close={info.openingHoursTuesdayEnd} editMode={true} />
                                            <InfoOpenedHoursTableRow day={"Wednesday"} open={info.openingHoursWednesdayStart} close={info.openingHoursWednesdayEnd} editMode={true} />
                                            <InfoOpenedHoursTableRow day={"Thursday"} open={info.openingHoursThursdayStart} close={info.openingHoursThursdayEnd} editMode={true} />
                                            <InfoOpenedHoursTableRow day={"Friday"} open={info.openingHoursFridayStart} close={info.openingHoursFridayEnd} editMode={true} />
                                            <InfoOpenedHoursTableRow day={"Saturday"} open={info.openingHoursSaturdayStart} close={info.openingHoursSaturdayEnd} editMode={true} />
                                            <InfoOpenedHoursTableRow day={"Sunday"} open={info.openingHoursSundayStart} close={info.openingHoursSundayEnd} editMode={true} />
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Grid>
        </>
    )
}