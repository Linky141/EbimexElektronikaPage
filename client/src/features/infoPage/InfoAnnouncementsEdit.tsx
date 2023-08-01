import { useAppDispatch, useAppSelector } from "../../app/service/configureService";
import InfoAnnouncementBox from "./InfoAnnouncementBox";
import { FieldValues, useForm } from "react-hook-form";
import { updateAnnouncementsAsync } from "./infoSlice";

interface Props {
    setEditingAnnouncementMode: React.Dispatch<React.SetStateAction<number>>;
    editingAnnouncementMode: number;
    setLoadingSubmit: React.Dispatch<React.SetStateAction<number>>;
    loadingSubmit: number;
}


export default function InfoAnnouncementsEdit(props: Props) {
    const dispatch = useAppDispatch();
    const { info } = useAppSelector(state => state.info);
    const { handleSubmit, setValue, } = useForm();


    async function submitForm(data: FieldValues) {
        try {
            data.Id = 1;
            await dispatch(updateAnnouncementsAsync(data));
        } catch (error) {
            console.log(error);
        } finally {
            props.setLoadingSubmit(-1);
            props.setEditingAnnouncementMode(-1);
        }
    }

    return (
        <>
            {info && info.infoAnnouncements && info.infoAnnouncements.map(announcement => (
                <InfoAnnouncementBox
                    submitForm={submitForm}
                    setValue={setValue}
                    key={announcement.id}
                    announcement={announcement}
                    handleSubmit={handleSubmit}
                    setEditingAnnouncementMode={props.setEditingAnnouncementMode}
                    editingAnnouncementMode={props.editingAnnouncementMode}
                    setLoadingSubmit={props.setLoadingSubmit}
                    loadingSubmit={props.loadingSubmit}
                />
            ))}
        </>
    )
}