import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/service/configureService";
import { useEffect, useState } from "react";
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Input, List, ListItem, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { Service } from "../../app/models/service";
import AppTextInput from "../../app/components/AppTextInput";
import { FieldValues, useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import agent from "../../app/api/agent";
import { setServices } from "./servicesSlice";
import { useTranslation } from "react-i18next";

export default function ServiceForm() {
    const { id } = useParams<{ id: string }>();
    const { service } = useAppSelector(state => state.services);
    const [serviceEdit, setServiceEdit] = useState<Service>(init);
    const [pictures, setPictures] = useState<string[]>([]);
    const [newService, setNewService] = useState(true);
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const { control, handleSubmit } = useForm();
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const { t } = useTranslation();

    function init() {
        const serviceLoad = service?.find(x => x.id === parseInt(id!));
        if (serviceLoad !== undefined) {
            return serviceLoad;
        }
        else
            return { id: 0, name: "", pictureUrls: [], currentStatus: 0, price: 0, plannedDateOfCompletion: "", description: "", comments: [] };
    }

    function handleOnSubmitAddService(data: FieldValues) {
        setLoadingSubmit(true);
        data.files = pictures;

        agent.Service
            .addService(data)
            .catch(error => console.log(error))
            .finally(() => {
                agent.Service.list()
                    .then(service => dispatch(setServices(service)))
                    .catch(error => console.log(error))
                    .finally(finishActions)
            });

        function finishActions() {
            setLoadingSubmit(false);
            navigate(location.state?.from || '/services');
        }
    }

    function handleOnSubmitEditService(data: FieldValues) {
        setLoadingSubmit(true);
        data.Id = serviceEdit.id;
        data.files = pictures;

        // console.log(data);
        agent.Service
            .updateService(data)
            .catch(error => console.log(error))
            .finally(() => {
                agent.Service.list()
                    .then(service => dispatch(setServices(service)))
                    .catch(error => console.log(error))
                    .finally(finishActions)
            });

        function finishActions() {
            setLoadingSubmit(false);
            console.log(data);
            navigate(location.state?.from || '/services/' + serviceEdit.id);
        }
    }

    useEffect(() => {
        if (serviceEdit.id !== 0)
            setNewService(false);

        serviceEdit.pictureUrls.forEach(element => {
            if (pictures === undefined) {
                setPictures([element.url]);
            }
            else {
                setPictures(previousState => [...previousState, element.url]);
            }
        });
    }, [serviceEdit.id])

    function handleChange(event: any) {
        let file = event.target.files[0];
        if (file !== undefined) {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                setPictures(previousState => [...previousState, reader.result!.toString()]);
            };
            reader.onerror = function (error) {
                console.log('Error: ', error);
            };
        }
    }

    return (
        <Grid container spacing={6} marginBottom={10}>

            <Grid item xs={12}>
                <AppTextInput
                    label={t("name")}
                    content={serviceEdit!.name}
                    name="Name"
                    control={control}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12}>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        fullWidth
                        component="label"
                    >{t("uploadNewImage")}
                        <input
                            type="file"
                            onChange={handleChange}
                            hidden
                        /></Button>
                </Grid>
                <Grid item xs={12}>
                    <Grid container>
                        {pictures.map(url => (
                            <Grid item key={url} xs={4}>
                                <Card sx={{ maxWidth: 345, marginTop: 5 }}>
                                    <img src={url} alt={url} style={{ margin: '10px', width: '325px', }} />
                                    <CardActions>
                                        <Button size="small" color="error" fullWidth onClick={() => {
                                            setPictures((current) =>
                                                current.filter((pic) => pic !== url)
                                            );
                                        }}>{t("delete")}</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h4">{t("details")}</Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <AppTextInput
                                        label={t("description")}
                                        content={serviceEdit!.description}
                                        name="Description"
                                        control={control}
                                        fullWidth
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <AppTextInput
                                        label={t("finishDate")}
                                        content={serviceEdit!.plannedDateOfCompletion}
                                        name="Finish date"
                                        control={control}
                                        fullWidth
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <AppTextInput
                                        label={t("price")}
                                        content={serviceEdit!.price.toString()}
                                        name="Price"
                                        control={control}
                                        fullWidth
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <AppTextInput
                                        label={t("status")}
                                        content={serviceEdit!.currentStatus.toString()}
                                        name="Status"
                                        control={control}
                                        fullWidth
                                    />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item xs={6}>
                {newService ? (
                    <LoadingButton
                        loading={loadingSubmit}
                        onClick={handleSubmit(handleOnSubmitAddService)}
                        fullWidth
                        color="success"
                        variant="outlined"
                    >{t("add")}</LoadingButton>
                ) : (
                    <LoadingButton
                        loading={loadingSubmit}
                        onClick={handleSubmit(handleOnSubmitEditService)}
                        fullWidth
                        color="success"
                        variant="outlined"
                    >{t("submit")}</LoadingButton>
                )}

            </Grid>
            <Grid item xs={6}>
                <Button fullWidth color="error" variant="outlined" onClick={() => navigate(location.state?.from || '/services')}>{t("cancel")}</Button>
            </Grid>
        </Grid>
    )
}