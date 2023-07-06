import { Button, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Moment from 'moment';
import ServiceStatus from "./ServiceStatus";
import ServicePreviewImage from "./ServicePreviewImage";
import agent from "../../app/api/agent";
import NotFound from "../../app/errors/NotFound";
import { useForm, FieldValues } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../app/service/configureService";
import { setServices } from "./servicesSlice";
import moment from "moment";
import { useTranslation } from "react-i18next";
import ServiceDetailsComments from "./ServiceDetailsComments";
import { findServiceId } from "../../app/utils/ServicesUtils";
import AppShowTextMultiline from "../../app/components/AppShowTextMultiline";

export default function ServiceDetails() {
    const { id } = useParams<{ id: string }>();
    const { service } = useAppSelector(state => state.services);
    const [addingCommentState, setaddingCommentState] = useState(false);
    const [loadingSubmitNewComment, setLoadingSubmitNewComment] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const { control, handleSubmit, setValue } = useForm();
    const dispatch = useAppDispatch();
    const { t } = useTranslation();

    function handleOnSubmitAddComment(data: FieldValues) {
        setLoadingSubmitNewComment(true);
        data.Id = id;
        data.user = "SAMPLE_USER";
        data.dateTime = moment().format("YYYY-MM-DDThh:mm:ss");

        agent.Service
            .addComment(data)
            .catch(error => console.log(error))
            .finally(() => {
                agent.Service.list()
                    .then(service => dispatch(setServices(service)))
                    .catch(error => console.log(error))
                    .finally(finishActions)
            });

        function finishActions() {
            setValue("content", "");
            setLoadingSubmitNewComment(false);
            setaddingCommentState(false);
        }
    }

    if (!service?.find(x => x.id === parseInt(id!)))
        return <NotFound />
    if (selectedImage)
        return <ServicePreviewImage selectedImage={selectedImage} setSelectedImage={setSelectedImage} />

    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Button size="small" component={Link} to={`/serviceFrom/${findServiceId(service, id).id}`}>{t("edit")}</Button>
                <Typography variant="h3">
                    {findServiceId(service, id).name}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Grid container>
                    {findServiceId(service, id).pictureUrls.map(({ url, id }) => (
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
                                <TableCell>{t("description")}</TableCell>
                                <TableCell><AppShowTextMultiline content={findServiceId(service, id).description}/></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>{t("finishDate")}</TableCell>
                                <TableCell>{Moment(findServiceId(service, id).plannedDateOfCompletion).format('DD-MM-YYYY')}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>{t("price")}</TableCell>
                                <TableCell>{(findServiceId(service, id).price / 100).toFixed(2)} PLN</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>{t("status")}</TableCell>
                                <TableCell>
                                    <ServiceStatus status={findServiceId(service, id).currentStatus} fontSize={14} color={"text.secondary"} gutterBottom={true} />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <ServiceDetailsComments
                service={findServiceId(service, id)}
                addingCommentState={addingCommentState}
                control={control}
                loadingSubmitNewComment={loadingSubmitNewComment}
                handleSubmit={handleSubmit}
                handleOnSubmitAddComment={handleOnSubmitAddComment}
                setaddingCommentState={setaddingCommentState}
            />
        </Grid>
    )
}