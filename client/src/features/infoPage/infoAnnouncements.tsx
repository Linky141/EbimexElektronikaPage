import { Grid, Button, TextField } from "@mui/material";
import { Info } from "../../app/models/info";
import InfoAnnouncementBox from "./InfoAnnouncementBox";

interface Props {
    editingAnnouncementMode: number;
    setEditingAnnouncementMode: (state: number) => void;
    info: Info;
}

export default function InfoAnnouncements({ info, editingAnnouncementMode, setEditingAnnouncementMode }: Props) {
    return (
        <Grid item xs={12}>
            {editingAnnouncementMode === -1 ? (<>
                {info.infoAnnouncements.map(announcement => (
                    <InfoAnnouncementBox
                        key={announcement.id}
                        announcement={announcement}
                        setEditingAnnouncementMode={setEditingAnnouncementMode}
                        editingAnnouncementMode={editingAnnouncementMode}
                    />
                ))}
                <form>
                    <Grid marginLeft="30px" marginRight="30px">
                        <TextField
                            id="outlined-basic"
                            label="New announcement"
                            variant="outlined"
                            multiline
                            fullWidth
                        />
                    </Grid>
                    <Grid marginTop="10px" display="flex" justifyContent="flex-end" marginRight="30px" marginBottom="5px">
                        <Button type="submit" variant="contained">Add</Button>
                    </Grid>
                </form>
            </>) : (<>
                {info.infoAnnouncements.map(announcement => (
                    <Grid key={announcement.id}>
                        <form>
                            <InfoAnnouncementBox
                                announcement={announcement}
                                setEditingAnnouncementMode={setEditingAnnouncementMode}
                                editingAnnouncementMode={editingAnnouncementMode}
                            />
                        </form>
                    </Grid>
                ))}
            </>)}
        </Grid>
    )
}