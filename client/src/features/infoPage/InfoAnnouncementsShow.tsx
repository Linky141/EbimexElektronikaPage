import { Grid, TextField } from "@mui/material";
import { InfoAnnouncement } from "../../app/models/info";
import InfoAnnouncementBox from "./InfoAnnouncementBox";
import { FieldValues, useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../app/service/configureService";
import { updateAnnouncementsAsync } from "./infoSlice";
import { useState } from "react";
import moment from "moment";
import { isAdmin } from "../../app/utils/RolesUtils";

interface Props {
    setEditingAnnouncementMode: React.Dispatch<React.SetStateAction<number>>;
    editingAnnouncementMode: number;
    setLoadingSubmit: React.Dispatch<React.SetStateAction<number>>;
    loadingSubmit: number;
}

export default function InfoAnnouncementsShow(props: Props) {
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const { user } = useAppSelector(state => state.account);
    const { info } = useAppSelector(state => state.info);
    const { handleSubmit, setValue } = useForm();
    const [newAnnouncementContent, setNewAnnouncementContent] = useState<string>('');

    async function submitForm(data: FieldValues) {
        try {
            data.Id = 1;
            await dispatch(updateAnnouncementsAsync(data));
        } catch (error) {
            console.log(error);
        } finally {
            props.setLoadingSubmit(-1);
            props.setEditingAnnouncementMode(-1);
            setNewAnnouncementContent('');
        }
    }

    function handleAddNewAnnouncement(contentAnnouncement: string) {
        const lastItem = info!.infoAnnouncements.length > 0 ? info!.infoAnnouncements[info!.infoAnnouncements.length - 1] : undefined;
        const newItemId = lastItem && lastItem.id ? lastItem.id + 1 : 0;
        const newItem: InfoAnnouncement = { id: newItemId, dateAndTime: moment().format("YYYY-MM-DDThh:mm:ss"), content: contentAnnouncement }
        const tmp: InfoAnnouncement[] = [...info!.infoAnnouncements, newItem];
        setValue("infoAnnouncements", tmp)
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
            {isAdmin(user) &&
                <>
                    <Grid marginLeft="30px" marginRight="30px">
                        <TextField
                            label={t("newAnnouncement")}
                            variant="outlined"
                            multiline
                            fullWidth
                            value={newAnnouncementContent}
                            onChange={e => setNewAnnouncementContent(e.target.value)}
                        />
                    </Grid>
                    <Grid marginTop="10px" display="flex" justifyContent="flex-end" marginRight="30px" marginBottom="5px">
                        <LoadingButton
                            variant="contained"
                            loading={props.loadingSubmit === 0}
                            onClick={() => {
                                if (newAnnouncementContent === '') {
                                    toast.error(t('fieldIsMandatory'));
                                }
                                else {
                                    props.setLoadingSubmit(0);
                                    handleAddNewAnnouncement(newAnnouncementContent);
                                    handleSubmit(submitForm)();
                                }
                            }}>{t("add")}</LoadingButton>
                    </Grid>
                </>
            }
        </>
    )
}