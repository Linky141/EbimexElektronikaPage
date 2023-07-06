import { Grid, Box, Button } from "@mui/material";
import { InfoAnnouncement } from "../../app/models/info";
import Moment from 'moment';
import { FieldValues, UseFormHandleSubmit } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { useTranslation } from "react-i18next";
import AppShowTextMultiline from "../../app/components/AppShowTextMultiline";

interface Props {
    announcement: InfoAnnouncement;
    setEditingAnnouncementMode: (id: number) => void;
    handleSubmit: UseFormHandleSubmit<FieldValues, undefined>;
    handleUpdateData: (data: FieldValues) => void;
    setLoadingSubmit: (data: number) => void;
    loadingSubmit: number;
    handleDeleteAnnouncement: () => void;
}

export default function InfoAnnouncementBoxShow(props: Props) {
    const { t } = useTranslation();
    
    return (
        <Box sx={{ margin: '10px', padding: '10px', borderStyle: 'solid', borderColor: 'primary.main', borderWidth: '2px', borderRadius: '20px' }}>
            <Grid container>
                <Grid item xs={6} color="text.secondary">
                    {Moment(props.announcement.dateAndTime).format('DD-MM-YYYY HH:mm')}
                </Grid>
                <Grid item xs={6} display="flex" justifyContent="flex-end" color="text.secondary">
                    <Button onClick={() => props.setEditingAnnouncementMode(props.announcement.id)}>{t("edit")}</Button>
                    <LoadingButton
                        loading={props.loadingSubmit === props.announcement.id}
                        onClick={() => {
                            props.setLoadingSubmit(props.announcement.id);
                            props.handleDeleteAnnouncement();
                            props.handleSubmit(props.handleUpdateData)();
                        }}
                        color="error"
                        variant="outlined">{t("delete")}</LoadingButton>
                </Grid>
            </Grid>
            <Grid item>
                <AppShowTextMultiline content={props.announcement.content}/>
            </Grid>
        </Box>
    )
}