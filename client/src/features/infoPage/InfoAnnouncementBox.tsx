import { InfoAnnouncement } from "../../app/models/info";
import { FieldValues, UseFormHandleSubmit, UseFormSetValue } from "react-hook-form";
import moment from 'moment';
import InfoAnnouncementBoxShow from "./InfoAnnouncementBoxShow";
import InfoAnnouncementBoxEdit from "./InfoAnnouncementBoxEdit";
import { useAppSelector } from "../../app/service/configureService";

interface Props {
    announcement: InfoAnnouncement;
    setEditingAnnouncementMode: (id: number) => void;
    editingAnnouncementMode: number;
    handleSubmit: UseFormHandleSubmit<FieldValues, undefined>;
    setValue: UseFormSetValue<FieldValues>;
    submitForm: (data: FieldValues) => void;
    setLoadingSubmit: (data: number) => void;
    loadingSubmit: number;
}

export default function InfoAnnouncementBox(props: Props) {
    const { info } = useAppSelector(state => state.info);
    
    function handleEditAnnouncement(contentAnnouncement: string) {
        const tmp: InfoAnnouncement[] = info!.infoAnnouncements.map(a => {
            if (a.id === props.announcement.id)
                return { id: props.announcement.id, dateAndTime: moment().format("YYYY-MM-DDThh:mm:ss"), content: contentAnnouncement };
            else
                return a;
        });
        props.setValue("infoAnnouncements", tmp)
    }

    function handleDeleteAnnouncement() {
        const tmp: InfoAnnouncement[] = info!.infoAnnouncements.filter(a =>
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
                    submitForm={props.submitForm}
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
                    submitForm={props.submitForm}
                    loadingSubmit={props.loadingSubmit}
                    setEditingAnnouncementMode={props.setEditingAnnouncementMode}
                    setLoadingSubmit={props.setLoadingSubmit}
                />
            )}
        </>
    )
}