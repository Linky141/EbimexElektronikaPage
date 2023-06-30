import { Info, InfoAnnouncement } from "../../app/models/info";
import { FieldValues, UseFormHandleSubmit, UseFormSetValue } from "react-hook-form";
import moment from 'moment';
import InfoAnnouncementBoxShow from "./InfoAnnouncementBoxShow";
import InfoAnnouncementBoxEdit from "./InfoAnnouncementBoxEdit";

interface Props {
    announcement: InfoAnnouncement;
    setEditingAnnouncementMode: (id: number) => void;
    editingAnnouncementMode: number;
    handleSubmit: UseFormHandleSubmit<FieldValues, undefined>;
    setValue: UseFormSetValue<FieldValues>;
    info: Info;
    handleUpdateData: (data: FieldValues) => void;
    setLoadingSubmit: (data: number) => void;
    loadingSubmit: number;
}

export default function InfoAnnouncementBox(props: Props) {
    
    function handleEditAnnouncement(contentAnnouncement: string) {
        const tmp: InfoAnnouncement[] = props.info.infoAnnouncements.map(a => {
            if (a.id === props.announcement.id)
                return { id: props.announcement.id, dateAndTime: moment().format("YYYY-MM-DDThh:mm:ss"), content: contentAnnouncement };
            else
                return a;
        });
        props.setValue("infoAnnouncements", tmp)
    }

    function handleDeleteAnnouncement() {
        const tmp: InfoAnnouncement[] = props.info.infoAnnouncements.filter(a =>
            a.id !== props.announcement.id
        );
        props.setValue("infoAnnouncements", tmp)
    }

    return (
        <>
            {props.editingAnnouncementMode === -1 ? (
                <InfoAnnouncementBoxShow
                    announcement={props.announcement}
                    handleDeleteAnnouncement={handleDeleteAnnouncement}
                    handleSubmit={props.handleSubmit}
                    handleUpdateData={props.handleUpdateData}
                    loadingSubmit={props.loadingSubmit}
                    setEditingAnnouncementMode={props.setEditingAnnouncementMode}
                    setLoadingSubmit={props.setLoadingSubmit}
                />
            ) : (
                <InfoAnnouncementBoxEdit
                    announcement={props.announcement}
                    editingAnnouncementMode={props.editingAnnouncementMode}
                    handleEditAnnouncement={handleEditAnnouncement}
                    handleSubmit={props.handleSubmit}
                    handleUpdateData={props.handleUpdateData}
                    loadingSubmit={props.loadingSubmit}
                    setEditingAnnouncementMode={props.setEditingAnnouncementMode}
                    setLoadingSubmit={props.setLoadingSubmit}
                />
            )}
        </>
    )
}