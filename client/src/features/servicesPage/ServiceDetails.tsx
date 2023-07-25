import { Button, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Moment from 'moment';
import ServiceStatus from "./ServiceStatus";
import ServicePreviewImage from "./ServicePreviewImage";
import NotFound from "../../app/errors/NotFound";
import { useAppSelector } from "../../app/service/configureService";
import { useTranslation } from "react-i18next";
import ServiceDetailsComments from "./ServiceDetailsComments";
import { findServiceId } from "../../app/utils/ServicesUtils";
import AppShowTextMultiline from "../../app/components/AppShowTextMultiline";
import { isAdmin } from "../../app/utils/RolesUtils";

export default function ServiceDetails() {
    const { id } = useParams<{ id: string }>();
    const { services } = useAppSelector(state => state.services);
    const { t } = useTranslation();
    const { user } = useAppSelector(state => state.account);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    if (!services?.find(x => x.id === parseInt(id!)))
        return <NotFound />
    if (selectedImage)
        return <ServicePreviewImage selectedImage={selectedImage} setSelectedImage={setSelectedImage} />

    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                {isAdmin(user) &&
                    <Button size="small" component={Link} to={`/serviceFrom/${findServiceId(services, id).id}`}>{t("edit")}</Button>
                }
                <Typography variant="h3">
                    {findServiceId(services, id).name}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Grid container>
                    {findServiceId(services, id).pictureUrls.map(({ url, id }) => (
                        <Grid item key={id} xs={4}>
                            <Button onClick={() => setSelectedImage(url)}>
                                <img src={url} alt={url} style={{ margin: '10px', width: '300px' }} />
                            </Button>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h4">{t("details")}</Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>{t("clientName")}</TableCell>
                                <TableCell><AppShowTextMultiline content={findServiceId(services, id).clientUsername} /></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>{t("clientEmail")}</TableCell>
                                <TableCell><AppShowTextMultiline content={findServiceId(services, id).clientEmail} /></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>{t("description")}</TableCell>
                                <TableCell><AppShowTextMultiline content={findServiceId(services, id).description} /></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>{t("finishDate")}</TableCell>
                                <TableCell>{Moment(findServiceId(services, id).plannedDateOfCompletion).format('DD-MM-YYYY')}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>{t("price")}</TableCell>
                                <TableCell>{(findServiceId(services, id).price / 100).toFixed(2)} PLN</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>{t("status")}</TableCell>
                                <TableCell>
                                    <ServiceStatus status={findServiceId(services, id).currentStatus} fontSize={14} color={"text.secondary"} gutterBottom={true} />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <ServiceDetailsComments id={id}/>
        </Grid>
    )
}