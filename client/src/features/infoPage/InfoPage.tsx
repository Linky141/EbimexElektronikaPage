import { Grid } from "@mui/material";
import InfoOpenedHours from "./InfoOpenedHours";
import InfoAnnouncements from "./infoAnnouncements";

export default function InfoPage() {
    return (
        <Grid container>
            <InfoOpenedHours />
            <InfoAnnouncements />
        </Grid >
    )
}