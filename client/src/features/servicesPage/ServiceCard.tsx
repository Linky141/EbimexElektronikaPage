import { Card, Button, CardActions, CardContent, Typography } from "@mui/material";
import { Service } from "../../app/models/service";
import Moment from 'moment';
import { Link } from "react-router-dom";
import ServiceStatus from "./ServiceStatus";
import { useAppDispatch, useAppSelector } from "../../app/service/configureService";
import { removeServiceAsync } from "./servicesSlice";
import { LoadingButton } from "@mui/lab";
import { useTranslation } from "react-i18next";
import { isAdmin } from "../../app/utils/RolesUtils";

interface Props {
    service: Service;
}

export default function ServiceCard({ service }: Props) {
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const { user } = useAppSelector(state => state.account);
    const { status } = useAppSelector(state => state.services);

    return (
        <Card>
            <CardContent>
                <Typography variant="h6" component="div">
                    {service.clientUsername}
                </Typography>
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
                {isAdmin(user) &&
                    <>
                        <Button size="small" component={Link} to={`/serviceFrom/${service.id}`}>{t("edit")}</Button>
                        <LoadingButton
                            loading={status === 'pendingRemoveItem' + service.id + 'rem'}
                            size="small"
                            onClick={() => {
                                dispatch(removeServiceAsync({ id: service.id, name: 'rem' }));
                            }}
                            variant="outlined"
                            color="error"
                        >{t("delete")}</LoadingButton>
                    </>
                }
            </CardActions>
        </Card>
    )
}