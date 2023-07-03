import { Grid } from "@mui/material";
import InfoOpenedHours from "./InfoOpenedHours";
import InfoAnnouncements from "./infoAnnouncements";
import { useAppSelector } from "../../app/service/configureService";

export default function InfoPage() {
    const { info } = useAppSelector(state => state.infos);
  
    return (
        <>
            {info!.map(info => (
                <Grid container key={info.id}>
                    <InfoOpenedHours
                        info={info}
                    />
                    <InfoAnnouncements 
                        info={info}
                    />
                </Grid >
            ))
            }
        </>
    )
}