import { Grid, Box, Button, TextField } from "@mui/material";
import { InfoAnnouncement } from "../../app/models/info";
import Moment from 'moment';
import { useEffect, useState } from "react";

interface Props {
    announcement: InfoAnnouncement;
    setEditingAnnouncementMode: (id: number) => void;
    editingAnnouncementMode: number;
}

export default function InfoAnnouncementBox({ announcement, setEditingAnnouncementMode, editingAnnouncementMode }: Props) {
    const [announcementContent, setAnnouncementContent] = useState<string>();

    useEffect(() => {
        setAnnouncementContent(announcement.content)
    }, [announcement.content]);

    return (
        <>
            {editingAnnouncementMode === -1 ? (
                <Box sx={{ margin: '10px', padding: '10px', borderStyle: 'solid', borderColor: 'primary.main', borderWidth: '2px', borderRadius: '20px' }}>
                    <Grid container>
                        <Grid item xs={6} color="text.secondary">
                            {Moment(announcement.dateAndTime).format('DD-MM-YYYY HH:mm')}
                        </Grid>
                        <Grid item xs={6} display="flex" justifyContent="flex-end" color="text.secondary">
                            <Button onClick={() => setEditingAnnouncementMode(announcement.id)}>Edit</Button>
                            <Button color="error" variant="outlined">Delete</Button>
                        </Grid>
                    </Grid>
                    <Grid item>
                        {announcement.content}
                    </Grid>
                </Box>
            ) : (
                <Box sx={{ margin: '10px', padding: '10px', borderStyle: 'solid', borderColor: 'primary.main', borderWidth: '2px', borderRadius: '20px' }}>
                    <Grid container>
                        <Grid item xs={6} color="text.secondary">
                            {Moment(announcement.dateAndTime).format('DD-MM-YYYY HH:mm')}
                        </Grid>
                        <Grid item xs={6} display="flex" justifyContent="flex-end" color="text.secondary">
                            {editingAnnouncementMode === announcement.id ? (
                                <>
                                    <Button type="submit" color="success">Submit</Button>
                                    <Button onClick={() => setEditingAnnouncementMode(-1)} color="error">Cancel</Button>
                                </>
                            ) : (<></>)}
                        </Grid>
                    </Grid>
                    <Grid item>
                        {editingAnnouncementMode === announcement.id ? (
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
                            {announcement.content}
                        </>)}
                    </Grid>
                </Box>
            )}
        </>
    )
}