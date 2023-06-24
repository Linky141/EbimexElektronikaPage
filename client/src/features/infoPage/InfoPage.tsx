import { Grid } from "@mui/material";
import { useState, useEffect } from "react";
import { Info } from "../../app/models/info";
import InfoOpenedHours from "./InfoOpenedHours";
import InfoAnnouncements from "./infoAnnouncements";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";

export default function InfoPage() {
    const [infos, setInfos] = useState<Info[]>([]);
    const [editingAnnouncementMode, setEditingAnnouncementMode] = useState(-1);
    const [editingOpenedHoursMode, setEditingOpenedHoursMode] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        agent.Info.list().then(infos => setInfos(infos))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }, [])

    if (loading)
    return <LoadingComponent message='Loading info...'/>

    return (
        <>
            {infos.map(info => (
                <Grid container key={info.id}>
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