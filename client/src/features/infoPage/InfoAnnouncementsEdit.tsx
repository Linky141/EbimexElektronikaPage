import { Info } from "../../app/models/info";
import InfoAnnouncementBox from "./InfoAnnouncementBox";
import { FieldValues, UseFormHandleSubmit, UseFormSetValue } from "react-hook-form";

interface Props {
    info: Info;
    handleUpdateData: (data: FieldValues) => void;
    setValue: UseFormSetValue<FieldValues>;
    handleSubmit: UseFormHandleSubmit<FieldValues, undefined>;
    setEditingAnnouncementMode: React.Dispatch<React.SetStateAction<number>>;
    editingAnnouncementMode: number;
    setLoadingSubmit: React.Dispatch<React.SetStateAction<number>>;
    loadingSubmit: number;
}

export default function InfoAnnouncementsEdit(props: Props) {

    return (
        <>
            {props.info.infoAnnouncements.map(announcement => (
                <InfoAnnouncementBox
                    handleUpdateData={props.handleUpdateData}
                    setValue={props.setValue}
                    info={props.info}
                    key={announcement.id}
                    announcement={announcement}
                    handleSubmit={props.handleSubmit}
                    setEditingAnnouncementMode={props.setEditingAnnouncementMode}
                    editingAnnouncementMode={props.editingAnnouncementMode}
                    setLoadingSubmit={props.setLoadingSubmit}
                    loadingSubmit={props.loadingSubmit}
                />
            ))}
        </>
    )
}