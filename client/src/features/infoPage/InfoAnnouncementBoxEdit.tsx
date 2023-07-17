import { Grid, Box, Button, TextField } from "@mui/material";
import { InfoAnnouncement } from "../../app/models/info";
import Moment from 'moment';
import { useState } from "react";
import { FieldValues, UseFormHandleSubmit } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import AppShowTextMultiline from "../../app/components/AppShowTextMultiline";

interface Props {
    announcement: InfoAnnouncement;
    setEditingAnnouncementMode: (id: number) => void;
    editingAnnouncementMode: number;
    handleSubmit: UseFormHandleSubmit<FieldValues, undefined>;
    submitForm: (data: FieldValues) => void;
    setLoadingSubmit: (data: number) => void;
    loadingSubmit: number;
    handleEditAnnouncement: (contentAnnouncement: string) => void;
}

export default function InfoAnnouncementBoxEdit(props: Props) {
    const [announcementContent, setAnnouncementContent] = useState<string>(props.announcement.content);
    const { t } = useTranslation();

    return (
        <Box sx={{ margin: '10px', padding: '10px', borderStyle: 'solid', borderColor: 'primary.main', borderWidth: '2px', borderRadius: '20px' }}>
            <Grid container>
                <Grid item xs={6} color="text.secondary">
                    {Moment(props.announcement.dateAndTime).format('DD-MM-YYYY HH:mm')}
                </Grid>
                <Grid item xs={6} display="flex" justifyContent="flex-end" color="text.secondary">
                    {props.editingAnnouncementMode === props.announcement.id ? (
                        <>
                            <LoadingButton
                                loading={props.loadingSubmit === props.announcement.id}
                                onClick={() => {
                                    if (announcementContent === '') {
                                        toast.error(t('fieldIsMandatory'));
                                    }
                                    else {
                                        props.setLoadingSubmit(props.announcement.id);
                                        props.handleEditAnnouncement(announcementContent);
                                        props.handleSubmit(props.submitForm)();
                                    }
                                }}
                                color="success"
                            >{t("submit")}</LoadingButton>
                            <Button onClick={() => props.setEditingAnnouncementMode(-1)} color="error">{t("cancel")}</Button>
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
                    <AppShowTextMultiline content={props.announcement.content}/>
                </>)}
            </Grid>
        </Box>
    )
}