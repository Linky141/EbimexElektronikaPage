import { Button, Grid, List, ListItem, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Moment from 'moment';
import ServiceStatus from "./ServiceStatus";
import ServiceCommentComponent from "./ServiceCommentComponent";
import ServicePreviewImage from "./ServicePreviewImage";
import agent from "../../app/api/agent";
import NotFound from "../../app/errors/NotFound";
import { LoadingButton } from "@mui/lab";
import AppTextInput from "../../app/components/AppTextInput";
import { useForm, FieldValues } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../app/service/configureService";
import { setServices } from "./servicesSlice";
import moment from "moment";
import { useTranslation } from "react-i18next";

export default function ServiceDetails() {
    const { id } = useParams<{ id: string }>();
    const { service } = useAppSelector(state => state.services);
    const [addingCommentState, setaddingCommentState] = useState(false);
    const [loadingSubmitNewComment, setLoadingSubmitNewComment] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const { control, handleSubmit } = useForm();
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
            setLoadingSubmitNewComment(false);
            setaddingCommentState(false);
        }
    }

    function selectedService() {
        return service?.find(x => x.id === parseInt(id!))!;
    }

    if (!service?.find(x => x.id === parseInt(id!)))
        return <NotFound />
    if (selectedImage)
        return <ServicePreviewImage selectedImage={selectedImage} setSelectedImage={setSelectedImage} />

    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Button size="small" component={Link} to={`/serviceFrom/${selectedService().id}`}>{t("edit")}</Button>
                <Typography variant="h3">
                    {selectedService().name}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Grid container>
                    {selectedService().pictureUrls.map(({ url, id }) => (
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
                                <TableCell>{selectedService().description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>{t("finishDate")}</TableCell>
                                <TableCell>{Moment(selectedService().plannedDateOfCompletion).format('DD-MM-YYYY')}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>{t("price")}</TableCell>
                                <TableCell>{(selectedService().price / 100).toFixed(2)} PLN</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>{t("status")}</TableCell>
                                <TableCell>
                                    <ServiceStatus status={selectedService().currentStatus} fontSize={14} color={"text.secondary"} gutterBottom={true} />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h4">{t("comments")}</Typography>
                <Grid container >
                    {selectedService().comments.map(({ content, dateTime, user, id }) => (
                        <Grid item xs={12} key={id}>
                            <ServiceCommentComponent content={content} dateTime={dateTime} user={user} />
                        </Grid>
                    ))}
                </Grid>
                <Grid>
                    {addingCommentState ? (
                        <>
                            <Grid marginLeft="30px" marginRight="30px">
                                <AppTextInput
                                    label={t("comment")}
                                    variant="outlined"
                                    content={""}
                                    fullWidth
                                    multiline
                                    name={"content"}
                                    control={control}
                                />
                            </Grid>
                            <Grid marginTop="10px" display="flex" justifyContent="flex-end" marginRight="30px" marginBottom="5px">
                                <LoadingButton
                                    loading={loadingSubmitNewComment}
                                    onClick={handleSubmit(handleOnSubmitAddComment)}
                                    fullWidth
                                    color="success"
                                    variant="outlined"
                                >{t("add")}</LoadingButton>
                            </Grid>
                        </>
                    ) : (
                        <Grid display="flex" justifyContent="flex-end" marginRight="30px" marginBottom="70px">
                            <Button variant="contained" onClick={() => setaddingCommentState(true)}>{t("addComment")}</Button>
                        </Grid>
                    )}
                </Grid>
            </Grid>
        </Grid>
    )
}