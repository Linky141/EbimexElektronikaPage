import { Grid, Box, Button, TextField } from "@mui/material";
import { Info } from "../../app/models/info";
import Moment from 'moment';

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
                    <form>
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
                                                defaultValue={announcement.content}
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
                    </form>
                ))}
            </>)}
        </Grid>
    )
}