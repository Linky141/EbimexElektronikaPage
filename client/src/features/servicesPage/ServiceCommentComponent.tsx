import { Box, Grid } from "@mui/material";
import Moment from 'moment';
import AppShowTextMultiline from "../../app/components/AppShowTextMultiline";

interface Props {
    content: string;
    dateTime: string;
    user: string;
}

export default function ServiceCommentComponent({ content, dateTime, user }: Props) {
    return (
        <Box sx={{ margin: '10px', padding: '10px', borderStyle: 'solid', borderColor: 'primary.main', borderWidth: '2px', borderRadius: '20px'}}>
            <Grid container>
                <Grid item xs={6} fontSize="25px">
                    {user}
                </Grid>
                <Grid item xs={6} display="flex" justifyContent="flex-end" color="text.secondary">
                    {Moment(dateTime).format('DD-MM-YYYY HH:mm')}                
                </Grid>
            </Grid>
            <Grid item>
                <AppShowTextMultiline content={content}/>
            </Grid>
        </Box>
    )
}