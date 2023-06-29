import { Grid, Button, TextField } from "@mui/material";
import { Info, InfoAnnouncement } from "../../app/models/info";
import InfoAnnouncementBox from "./InfoAnnouncementBox";
import { FieldValues, useForm } from "react-hook-form";
import { useAppDispatch } from "../../app/service/configureService";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import { setContacts } from "../contactPage/contactSlice";
import { setInfos } from "./infoSlice";
import { LoadingButton } from "@mui/lab";
import moment from 'moment';

interface Props {
    editingAnnouncementMode: number;
    setEditingAnnouncementMode: (state: number) => void;
    info: Info;
}

export default function InfoAnnouncements(props: Props) {
    const { control, handleSubmit } = useForm();
    const dispatch = useAppDispatch();
    const [announcements, setAnnouncements] = useState<InfoAnnouncement[]>([]);
    const [announcementLoaded, setAnnouncementLoaded] = useState(false);
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [newContentState, setNewContentState] = useState<string>('');

    function handleOnSubmitAnnouncementsData(data: FieldValues) {
        setLoadingSubmit(true);

        const lastItem = announcements.length > 0 ? announcements[announcements.length - 1] : undefined;
        const newItemId = lastItem && lastItem.id ? lastItem.id + 1 : 0;
        const newItem: InfoAnnouncement = { id: newItemId, dateAndTime: moment().format("YYYY-MM-DDThh:mm:ss"), content: newContentState }
        const tmp: InfoAnnouncement[] = [...announcements, newItem];

        data.Id = 1;
        data.infoAnnouncements = tmp;
        agent.Info
            .UpdateAnnouncements(data)
            .then(infos => dispatch(setInfos(infos)))
            .catch(error => console.log(error))
            .finally(finishActions);

        function finishActions(){
            setLoadingSubmit(false);
            props.setEditingAnnouncementMode(-1);
        }
    }

    useEffect(() => {
        if (!announcementLoaded) {
            props.info.infoAnnouncements.forEach(element => {
                setAnnouncements(props.info.infoAnnouncements);
            });
        }
        setAnnouncementLoaded(true);
    }, [announcementLoaded, props.info.infoAnnouncements])

    return (
        <Grid item xs={12}>
            {props.editingAnnouncementMode === -1 ? (<>
                {props.info.infoAnnouncements.map(announcement => (
                    <InfoAnnouncementBox
                        key={announcement.id}
                        announcement={announcement}
                        announcements={announcements}
                        setAnnouncements={setAnnouncements}
                        // handleOnSubmitAnnouncementsData={handleOnSubmitAnnouncementsData}
                        handleSubmit={handleSubmit}
                        setEditingAnnouncementMode={props.setEditingAnnouncementMode}
                        editingAnnouncementMode={props.editingAnnouncementMode}
                    />
                ))}
                <>
                    <Grid marginLeft="30px" marginRight="30px">
                        <TextField
                            label="New announcement"
                            variant="outlined"
                            multiline
                            fullWidth
                            value={newContentState}
                            onChange={e => setNewContentState(e.target.value)}
                        />
                    </Grid>
                    <Grid marginTop="10px" display="flex" justifyContent="flex-end" marginRight="30px" marginBottom="5px">
                        <LoadingButton variant="contained" loading={loadingSubmit} onClick={handleSubmit(handleOnSubmitAnnouncementsData)}>Add</LoadingButton>
                    </Grid>
                </>
            </>) : (<>
                {props.info.infoAnnouncements.map(announcement => (
                    <InfoAnnouncementBox
                        key={announcement.id}
                        announcement={announcement}
                        announcements={announcements}
                        setAnnouncements={setAnnouncements}
                        // handleOnSubmitAnnouncementsData={handleOnSubmitAnnouncementsData}
                        handleSubmit={handleSubmit}
                        setEditingAnnouncementMode={props.setEditingAnnouncementMode}
                        editingAnnouncementMode={props.editingAnnouncementMode}
                    />
                ))}
            </>)}
        </Grid>
    )
}