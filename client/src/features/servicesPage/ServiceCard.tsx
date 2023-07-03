import { Card, Button, CardActions, CardContent, Typography } from "@mui/material";
import { Service } from "../../app/models/service";
import Moment from 'moment';
import { Link } from "react-router-dom";
import ServiceStatus from "./ServiceStatus";
import { useAppDispatch } from "../../app/service/configureService";
import { removeService } from "./servicesSlice";
import agent from "../../app/api/agent";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";

interface Props {
    service: Service;
}

export default function ServiceCard({ service }: Props) {
    const dispatch = useAppDispatch();
    const [loadingSubmit, setLoadingSubmit] = useState(false);

    function RemoveService() {
        setLoadingSubmit(true);
        agent.Service.removeService(service.id)
            .then(service => dispatch(removeService(service)))
            .catch(error => console.log(error))
            .finally(() => setLoadingSubmit(false))
    }

    return (
        <Card>
            <CardContent>
                <ServiceStatus status={service.currentStatus} fontSize={14} color={"text.secondary"} gutterBottom={true} />
                <Typography variant="h5" component="div">
                    {service.name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Deadline: {Moment(service.plannedDateOfCompletion).format('DD-MM-YYYY')}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {(service.price / 100).toFixed(2)} PLN
                </Typography>
                <Typography variant="body2">
                    {service.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" component={Link} to={`/services/${service.id}`}>View</Button>
                <LoadingButton loading={loadingSubmit} size="small" onClick={RemoveService} variant="outlined" color="error">Remove</LoadingButton>
            </CardActions>
        </Card>
    )
}