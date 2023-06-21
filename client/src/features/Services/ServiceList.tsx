import { Grid } from "@mui/material";
import { Service } from "../../app/models/service";
import ServiceCard from "./ServiceCard";

interface Props {
    services: Service[];
}

export default function ServiceList({ services }: Props) {
    return (
        <Grid container spacing={4}>
            {services.map(service => (
                <Grid item xs={4} key={service.id}>
                    <ServiceCard service={service} />
                </Grid>
            ))}
        </Grid>
    )
}