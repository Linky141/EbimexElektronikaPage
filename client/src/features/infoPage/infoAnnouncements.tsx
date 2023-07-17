import { Grid } from "@mui/material";
import { useState } from "react";
import InfoAnnouncementsShow from "./InfoAnnouncementsShow";
import InfoAnnouncementsEdit from "./InfoAnnouncementsEdit";

export default function InfoAnnouncements() {
    const [loadingSubmit, setLoadingSubmit] = useState(-1);
    const [editingAnnouncementMode, setEditingAnnouncementMode] = useState(-1);

    return (
        <Grid item xs={12}>
            {editingAnnouncementMode === -1 ? (
                <InfoAnnouncementsShow
                    editingAnnouncementMode={editingAnnouncementMode}
                    loadingSubmit={loadingSubmit}
                    setEditingAnnouncementMode={setEditingAnnouncementMode}
                    setLoadingSubmit={setLoadingSubmit}
                />
            ) : (
                <InfoAnnouncementsEdit
                    editingAnnouncementMode={editingAnnouncementMode}
                    loadingSubmit={loadingSubmit}
                    setEditingAnnouncementMode={setEditingAnnouncementMode}
                    setLoadingSubmit={setLoadingSubmit}
                />
            )}
        </Grid>
    )
}