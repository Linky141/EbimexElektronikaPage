import { Grid } from "@mui/material";
import { useState, useEffect } from "react";
import { Info } from "../../app/models/info";
import InfoOpenedHours from "./InfoOpenedHours";
import InfoAnnouncements from "./infoAnnouncements";

export default function InfoPage() {
    const [infos, setInfos] = useState<Info[]>([]);
    const [editingAnnouncementMode, setEditingAnnouncementMode] = useState(-1);
    const [editingOpenedHoursMode, setEditingOpenedHoursMode] = useState(false);

    useEffect(() => {
        fetch('http://localhost:5000/api/infos')
            .then(response => response.json())
            .then(data => setInfos(data));
    }, [])

    return (
        <>
            {infos.map(info => (
                <Grid container>
                    <InfoOpenedHours
                        editingOpenedHoursMode={editingOpenedHoursMode}
                        setEditingOpenedHoursMode={setEditingOpenedHoursMode}
                        info={info}
                    />
                    <InfoAnnouncements editingAnnouncementMode={editingAnnouncementMode}
                        setEditingAnnouncementMode={setEditingAnnouncementMode}
                        info={info}
                    />
                </Grid >
            ))
            }
        </>
    )
}