import { Grid } from "@mui/material";
import ServiceCard from "./ServiceCard";
import { useAppSelector } from "../../app/service/configureService";

export default function ServiceList() {
    const { services } = useAppSelector(state => state.services);

    return (
        <Grid container spacing={4}>
            {services && services.map(service => (
                <Grid item xs={4} key={service.id}>
                    <ServiceCard service={service} />
                </Grid>
            ))}
        </Grid>
    )
}