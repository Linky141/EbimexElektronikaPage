import { Grid, Typography, Button, TableContainer, Table, TableBody } from "@mui/material";
import InfoOpenedHoursTableRow from "./InfoOpenedHoursTableRow";
import { Info } from "../../app/models/info";
import { useForm, FieldValues } from "react-hook-form";
import { useAppDispatch } from "../../app/service/configureService";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import agent from "../../app/api/agent";
import { setInfos } from "./infoSlice";

interface Props {
    editingOpenedHoursMode: boolean;
    setEditingOpenedHoursMode: (state: boolean) => void;
    info: Info;
}

export default function InfoOpenedHours(props: Props) {
    const { control, handleSubmit, setValue } = useForm();
    const dispatch = useAppDispatch();
    const [loadingSubmit, setLoadingSubmit] = useState(false);

    function handleOnSubmitOpenHours(data: FieldValues) {
        setLoadingSubmit(true);
        data.Id = 1;

        agent.Info
            .UpdateOpenHours(data)
            .then(infos => dispatch(setInfos(infos)))
            .catch(error => console.log(error))
            .finally(finishActions);

        function finishActions(){
            setLoadingSubmit(false);
            props.setEditingOpenedHoursMode(false);
        }
    }
    return (
        <>
            <Grid item xs={12}>
                {!props.editingOpenedHoursMode ? (
                    <Grid container>
                        <Grid item>
                            <Typography variant="h4">Open hours</Typography>
                        </Grid>
                        <Grid item>
                            <Button onClick={() => props.setEditingOpenedHoursMode(true)}>Edit</Button>
                        </Grid>
                        <Grid item xs={12}>
                            <TableContainer>
                                <Table>
                                    <TableBody>
                                        <InfoOpenedHoursTableRow setValue={setValue} nameStart="OpeningHoursMondayStart" nameEnd="OpeningHoursMondayEnd" control={control} day={"Monday"} open={props.info.openingHoursMondayStart} close={props.info.openingHoursMondayEnd} editMode={false} />
                                        <InfoOpenedHoursTableRow setValue={setValue} nameStart="OpeningHoursTuesdayStart" nameEnd="OpeningHoursTuesdayEnd"  control={control} day={"Tuesday"} open={props.info.openingHoursTuesdayStart} close={props.info.openingHoursTuesdayEnd} editMode={false} />
                                        <InfoOpenedHoursTableRow setValue={setValue} nameStart="OpeningHoursWednesdayStart" nameEnd="OpeningHoursWednesdayEnd"  control={control} day={"Wednesday"} open={props.info.openingHoursWednesdayStart} close={props.info.openingHoursWednesdayEnd} editMode={false} />
                                        <InfoOpenedHoursTableRow setValue={setValue} nameStart="OpeningHoursThursdayStart" nameEnd="OpeningHoursThursdayEnd"  control={control} day={"Thursday"} open={props.info.openingHoursThursdayStart} close={props.info.openingHoursThursdayEnd} editMode={false} />
                                        <InfoOpenedHoursTableRow setValue={setValue} nameStart="OpeningHoursFridayStart" nameEnd="OpeningHoursFridayEnd"  control={control} day={"Friday"} open={props.info.openingHoursFridayStart} close={props.info.openingHoursFridayEnd} editMode={false} />
                                        <InfoOpenedHoursTableRow setValue={setValue} nameStart="OpeningHoursSaturdayStart" nameEnd="OpeningHoursSaturdayEnd"  control={control} day={"Saturday"} open={props.info.openingHoursSaturdayStart} close={props.info.openingHoursSaturdayEnd} editMode={false} />
                                        <InfoOpenedHoursTableRow setValue={setValue} nameStart="OpeningHoursSundayStart" nameEnd="OpeningHoursSundayEnd"  control={control} day={"Sunday"} open={props.info.openingHoursSundayStart} close={props.info.openingHoursSundayEnd} editMode={false} />
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                ) : (
                    <Grid container>
                        <Grid item>
                            <Typography variant="h4">Open hours</Typography>
                        </Grid>
                        <Grid item>
                            <LoadingButton loading={loadingSubmit} onClick={handleSubmit(handleOnSubmitOpenHours)} color="success">Submit</LoadingButton>
                            <Button onClick={() => props.setEditingOpenedHoursMode(false)} color="error">Cancel</Button>
                        </Grid>
                        <Grid item xs={12}>
                            <TableContainer>
                                <Table>
                                    <TableBody>
                                        <InfoOpenedHoursTableRow setValue={setValue} nameStart="OpeningHoursMondayStart" nameEnd="OpeningHoursMondayEnd"  control={control} day={"Monday"} open={props.info.openingHoursMondayStart} close={props.info.openingHoursMondayEnd} editMode={true} />
                                        <InfoOpenedHoursTableRow setValue={setValue} nameStart="OpeningHoursTuesdayStart" nameEnd="OpeningHoursTuesdayEnd" control={control} day={"Tuesday"} open={props.info.openingHoursTuesdayStart} close={props.info.openingHoursTuesdayEnd} editMode={true} />
                                        <InfoOpenedHoursTableRow setValue={setValue} nameStart="OpeningHoursWednesdayStart" nameEnd="OpeningHoursWednesdayEnd" control={control} day={"Wednesday"} open={props.info.openingHoursWednesdayStart} close={props.info.openingHoursWednesdayEnd} editMode={true} />
                                        <InfoOpenedHoursTableRow setValue={setValue} nameStart="OpeningHoursThursdayStart" nameEnd="OpeningHoursThursdayEnd" control={control} day={"Thursday"} open={props.info.openingHoursThursdayStart} close={props.info.openingHoursThursdayEnd} editMode={true} />
                                        <InfoOpenedHoursTableRow setValue={setValue} nameStart="OpeningHoursFridayStart" nameEnd="OpeningHoursFridayEnd"  control={control} day={"Friday"} open={props.info.openingHoursFridayStart} close={props.info.openingHoursFridayEnd} editMode={true} />
                                        <InfoOpenedHoursTableRow setValue={setValue} nameStart="OpeningHoursSaturdayStart" nameEnd="OpeningHoursSaturdayEnd" control={control} day={"Saturday"} open={props.info.openingHoursSaturdayStart} close={props.info.openingHoursSaturdayEnd} editMode={true} />
                                        <InfoOpenedHoursTableRow setValue={setValue} nameStart="OpeningHoursSundayStart" nameEnd="OpeningHoursSundayEnd"  control={control} day={"Sunday"} open={props.info.openingHoursSundayStart} close={props.info.openingHoursSundayEnd} editMode={true} />
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                )}
            </Grid>
        </>
    )
}