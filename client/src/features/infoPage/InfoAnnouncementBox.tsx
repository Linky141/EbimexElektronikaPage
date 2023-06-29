import { Grid, Box, Button, TextField, InputLabel } from "@mui/material";
import { InfoAnnouncement } from "../../app/models/info";
import Moment from 'moment';
import { useEffect, useState } from "react";
import { FieldValues, SubmitErrorHandler, SubmitHandler, UseFormHandleSubmit } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import agent from "../../app/api/agent";
import { setInfos } from "./infoSlice";
import { useAppDispatch } from "../../app/service/configureService";
import moment from 'moment';

interface Props {
    announcement: InfoAnnouncement;
    setEditingAnnouncementMode: (id: number) => void;
    editingAnnouncementMode: number;
    announcements: InfoAnnouncement[];
    setAnnouncements: (announcements: InfoAnnouncement[]) => void;
    // handleOnSubmitAnnouncementsData: (data: FieldValues) => void;
    handleSubmit: UseFormHandleSubmit<FieldValues, undefined>;
}

export default function InfoAnnouncementBox(props: Props) {
    const [announcementContent, setAnnouncementContent] = useState<string>(props.announcement.content);

    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const dispatch = useAppDispatch();

    function submitEditAnnouncement(data: FieldValues) {
        setLoadingSubmit(true);

        const tmp: InfoAnnouncement[] = props.announcements.map(a => {
            if (a.id === props.announcement.id)
                return { id: props.announcement.id, dateAndTime: moment().format("YYYY-MM-DDThh:mm:ss"), content: announcementContent };
            else
                return a;
        });

        data.Id = 1;
        data.infoAnnouncements = tmp;
        agent.Info
            .UpdateAnnouncements(data)
            .then(infos => dispatch(setInfos(infos)))
            .catch(error => console.log(error))
            .finally(finishActions);

        function finishActions() {
            setLoadingSubmit(false);
            props.setEditingAnnouncementMode(-1);
        }
        console.log(data);
    }

    function submitRemoveAnnouncement(data: FieldValues) {
        setLoadingSubmit(true);

        const tmp: InfoAnnouncement[] = props.announcements.filter(a =>
            a.id !== props.announcement.id
        );

        data.Id = 1;
        data.infoAnnouncements = tmp;
        agent.Info
            .UpdateAnnouncements(data)
            .then(infos => dispatch(setInfos(infos)))
            .catch(error => console.log(error))
            .finally(finishActions);

        function finishActions() {
            setLoadingSubmit(false);
            props.setEditingAnnouncementMode(-1);
        }
        console.log(data);
    }

    return (
        <>
            {props.editingAnnouncementMode === -1 ? (
                <Box sx={{ margin: '10px', padding: '10px', borderStyle: 'solid', borderColor: 'primary.main', borderWidth: '2px', borderRadius: '20px' }}>
                    <Grid container>
                        <Grid item xs={6} color="text.secondary">
                            {Moment(props.announcement.dateAndTime).format('DD-MM-YYYY HH:mm')}
                        </Grid>
                        <Grid item xs={6} display="flex" justifyContent="flex-end" color="text.secondary">
                            <Button onClick={() => props.setEditingAnnouncementMode(props.announcement.id)}>Edit</Button>
                            <LoadingButton loading={loadingSubmit} onClick={props.handleSubmit(submitRemoveAnnouncement)} color="error" variant="outlined">Delete</LoadingButton>
                        </Grid>
                    </Grid>
                    <Grid item>
                        {props.announcement.content.split("\n").map((i, key) => {
                            return <div key={key}>{i}</div>;
                        })}
                    </Grid>
                </Box>
            ) : (
                <Box sx={{ margin: '10px', padding: '10px', borderStyle: 'solid', borderColor: 'primary.main', borderWidth: '2px', borderRadius: '20px' }}>
                    <Grid container>
                        <Grid item xs={6} color="text.secondary">
                            {Moment(props.announcement.dateAndTime).format('DD-MM-YYYY HH:mm')}
                        </Grid>
                        <Grid item xs={6} display="flex" justifyContent="flex-end" color="text.secondary">
                            {props.editingAnnouncementMode === props.announcement.id ? (
                                <>
                                    <LoadingButton loading={loadingSubmit} onClick={props.handleSubmit(submitEditAnnouncement)} color="success">Submit</LoadingButton>
                                    <Button onClick={() => props.setEditingAnnouncementMode(-1)} color="error">Cancel</Button>
                                </>
                            ) : (<></>)}
                        </Grid>
                    </Grid>
                    <Grid item>
                        {props.editingAnnouncementMode === props.announcement.id ? (
                            <>
                                <Grid marginLeft="30px" marginRight="30px">
                                    <TextField
                                        id="outlined-basic"
                                        variant="outlined"
                                        value={announcementContent}
                                        onChange={e => setAnnouncementContent(e.target.value)}
                                        multiline
                                        fullWidth
                                    />
                                </Grid>
                            </>
                        ) : (<>
                            {props.announcement.content}
                        </>)}
                    </Grid>
                </Box>
            )}
        </>
    )
}