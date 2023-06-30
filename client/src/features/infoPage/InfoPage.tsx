import { Grid } from "@mui/material";
import { useState, useEffect } from "react";
import InfoOpenedHours from "./InfoOpenedHours";
import InfoAnnouncements from "./infoAnnouncements";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/service/configureService";
import { setInfos } from "./infoSlice";

export default function InfoPage() {
    const dispatch = useAppDispatch();
    const { info } = useAppSelector(state => state.infos);
  
    const [loadingComponent, setLoadingComponent] = useState(true);

    useEffect(() => {
        agent.Info.list()
            .then(info => dispatch(setInfos(info)))
            .catch(error => console.log(error))
            .finally(() => setLoadingComponent(false))
    }, [dispatch])

    if (loadingComponent)
    return <LoadingComponent message='Loading info...'/>

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