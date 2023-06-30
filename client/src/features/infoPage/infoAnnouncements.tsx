import { Grid } from "@mui/material";
import { Info, InfoAnnouncement } from "../../app/models/info";
import { FieldValues, useForm } from "react-hook-form";
import { useAppDispatch } from "../../app/service/configureService";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import { setInfos } from "./infoSlice";
import moment from 'moment';
import InfoAnnouncementsShow from "./InfoAnnouncementsShow";
import InfoAnnouncementsEdit from "./InfoAnnouncementsEdit";

interface Props {
    info: Info;
}

export default function InfoAnnouncements(props: Props) {
    const { handleSubmit, setValue } = useForm();
    const dispatch = useAppDispatch();

    const [loadingSubmit, setLoadingSubmit] = useState(-1);
    const [newAnnouncementContent, setNewAnnouncementContent] = useState<string>('');
    const [editingAnnouncementMode, setEditingAnnouncementMode] = useState(-1);

    useEffect(() => {
        setValue("infoAnnouncements", props.info.infoAnnouncements);
    }, [props.info.infoAnnouncements, setValue])

    function handleUpdateData(data: FieldValues) {
        data.Id = 1;
        agent.Info
            .UpdateAnnouncements(data)
            .then(infos => dispatch(setInfos(infos)))
            .catch(error => console.log(error))
            .finally(finishActions);

        function finishActions() {
            setLoadingSubmit(-1);
            setEditingAnnouncementMode(-1);
            setNewAnnouncementContent('');
        }
    }

    function handleAddNewAnnouncement(contentAnnouncement: string) {
        const lastItem = props.info.infoAnnouncements.length > 0 ? props.info.infoAnnouncements[props.info.infoAnnouncements.length - 1] : undefined;
        const newItemId = lastItem && lastItem.id ? lastItem.id + 1 : 0;
        const newItem: InfoAnnouncement = { id: newItemId, dateAndTime: moment().format("YYYY-MM-DDThh:mm:ss"), content: contentAnnouncement }
        const tmp: InfoAnnouncement[] = [...props.info.infoAnnouncements, newItem];
        setValue("infoAnnouncements", tmp)
    }

    return (
        <Grid item xs={12}>
            {editingAnnouncementMode === -1 ? (
                <InfoAnnouncementsShow
                    info={props.info}
                    handleUpdateData={handleUpdateData}
                    editingAnnouncementMode={editingAnnouncementMode}
                    handleAddNewAnnouncement={handleAddNewAnnouncement}
                    handleSubmit={handleSubmit}
                    loadingSubmit={loadingSubmit}
                    newAnnouncementContent={newAnnouncementContent}
                    setEditingAnnouncementMode={setEditingAnnouncementMode}
                    setLoadingSubmit={setLoadingSubmit}
                    setNewAnnouncementContent={setNewAnnouncementContent}
                    setValue={setValue}
                />
            ) : (
                <InfoAnnouncementsEdit
                    info={props.info}
                    handleUpdateData={handleUpdateData}
                    editingAnnouncementMode={editingAnnouncementMode}
                    handleSubmit={handleSubmit}
                    loadingSubmit={loadingSubmit}
                    setEditingAnnouncementMode={setEditingAnnouncementMode}
                    setLoadingSubmit={setLoadingSubmit}
                    setValue={setValue}
                />
            )}
        </Grid>
    )
}