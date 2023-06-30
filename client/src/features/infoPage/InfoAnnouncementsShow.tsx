import { Grid, TextField } from "@mui/material";
import { Info } from "../../app/models/info";
import InfoAnnouncementBox from "./InfoAnnouncementBox";
import { FieldValues, UseFormHandleSubmit, UseFormSetValue } from "react-hook-form";
import { LoadingButton } from "@mui/lab";

interface Props {
    info: Info;
    handleUpdateData: (data: FieldValues) => void;
    setValue: UseFormSetValue<FieldValues>;
    handleSubmit: UseFormHandleSubmit<FieldValues, undefined>;
    setEditingAnnouncementMode: React.Dispatch<React.SetStateAction<number>>;
    editingAnnouncementMode: number;
    setLoadingSubmit: React.Dispatch<React.SetStateAction<number>>;
    loadingSubmit: number;
    newAnnouncementContent: string;
    setNewAnnouncementContent: React.Dispatch<React.SetStateAction<string>>;
    handleAddNewAnnouncement: (contentAnnouncement: string) => void;
}

export default function InfoAnnouncementsShow(props: Props) {

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
            <>
                <Grid marginLeft="30px" marginRight="30px">
                    <TextField
                        label="New announcement"
                        variant="outlined"
                        multiline
                        fullWidth
                        value={props.newAnnouncementContent}
                        onChange={e => props.setNewAnnouncementContent(e.target.value)}
                    />
                </Grid>
                <Grid marginTop="10px" display="flex" justifyContent="flex-end" marginRight="30px" marginBottom="5px">
                    <LoadingButton
                        variant="contained"
                        loading={props.loadingSubmit === 0}
                        onClick={() => {
                            props.setLoadingSubmit(0);
                            props.handleAddNewAnnouncement(props.newAnnouncementContent);
                            props.handleSubmit(props.handleUpdateData)();
                        }}>Add</LoadingButton>
                </Grid>
            </>
        </>
    )
}