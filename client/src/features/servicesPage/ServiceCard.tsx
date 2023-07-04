import { Card, Button, CardActions, CardContent, Typography } from "@mui/material";
import { Service } from "../../app/models/service";
import Moment from 'moment';
import { Link } from "react-router-dom";
import ServiceStatus from "./ServiceStatus";
import { useAppDispatch } from "../../app/service/configureService";
import { setServices } from "./servicesSlice";
import agent from "../../app/api/agent";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface Props {
    service: Service;
}

export default function ServiceCard({ service }: Props) {
    const dispatch = useAppDispatch();
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const { t } = useTranslation();

    function RemoveService() {
        setLoadingSubmit(true);
        agent.Service.removeService(service.id)
            .catch(error => console.log(error))
            .finally(() => {
                agent.Service.list()
                .then(service => dispatch(setServices(service)))
                .catch(error => console.log(error))
                .finally(() => setLoadingSubmit(false))
            })
    }
    
    return (
        <Card>
            <CardContent>
                <ServiceStatus status={service.currentStatus} fontSize={14} color={"text.secondary"} gutterBottom={true} />
                <Typography variant="h5" component="div">
                    {service.name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {t("deadline")}: {Moment(service.plannedDateOfCompletion).format('DD-MM-YYYY')}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {(service.price / 100).toFixed(2)} PLN
                </Typography>
                <Typography variant="body2">
                    {service.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" component={Link} to={`/services/${service.id}`}>{t("view")}</Button>
                <Button size="small" component={Link} to={`/serviceFrom/${service.id}`}>{t("edit")}</Button>
                <LoadingButton loading={loadingSubmit} size="small" onClick={RemoveService} variant="outlined" color="error">{t("delete")}</LoadingButton>
            </CardActions>
        </Card>
    )
}