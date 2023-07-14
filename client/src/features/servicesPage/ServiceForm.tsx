import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/service/configureService";
import { useEffect, useState } from "react";
import { Button, Card, CardActions, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import AppTextInput from "../../app/components/AppTextInput";
import { FieldValues, useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import agent from "../../app/api/agent";
import { setServices } from "./servicesSlice";
import { useTranslation } from "react-i18next";
import { EncryptPictureToArray } from "../../app/utils/Base64Utils";
import ServicePreviewImage from "./ServicePreviewImage";
import RadioButtonGroup from "../../app/components/RadioButtonGroup";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { CreateSendDate, findServiceId } from "../../app/utils/ServicesUtils";
import { yupResolver } from "@hookform/resolvers/yup";
import { ServiceFormSchema } from "../Validations/ServicesPageValidations";
import AppSelectList from "../../app/components/AppSelectList";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { User } from "../../app/models/user";
import NotFound from "../../app/errors/NotFound";


export default function ServiceForm() {
    const { id } = useParams<{ id: string }>();
    const { service } = useAppSelector(state => state.services);
    const [pictures, setPictures] = useState<string[]>([]);
    const [newService, setNewService] = useState(true);
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [statusLocal, setStatusLocal] = useState<number>(-1);
    const [dateLocal, setDateLocal] = useState<string>('0001-01-01T00:00:00');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const { control, handleSubmit } = useForm<any>({
        resolver: yupResolver(ServiceFormSchema())
    });
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [users, setUsers] = useState<User[]>([]);
    const { user } = useAppSelector(state => state.account);
    const [loadingS, setLoadingS] = useState(true);

    const statusItems = [
        { value: 0, label: t("notStarted") },
        { value: 1, label: t("opened") },
        { value: 2, label: t("waitingForComponents") },
        { value: 3, label: t("testing") },
        { value: 4, label: t("readyToBePickedUp") },
        { value: 5, label: t("releasedToCustomer") }
    ];

    useEffect(() => {
        if (id !== '0')
        {
            setNewService(false);
            setStatusLocal(findServiceId(service, id).currentStatus);
            setDateLocal(findServiceId(service, id).plannedDateOfCompletion);

            findServiceId(service, id).pictureUrls.forEach(element => {
                if (pictures === undefined) {
                    setPictures([element.url]);
                }
                else {
                    setPictures(previousState => [...previousState, element.url]);
                }
            });
        }
        else {
            setStatusLocal(0);
            setDateLocal(dayjs(new Date()).toString());
        }

        agent.Account.users()
            .then(users => setUsers(users))
            .catch(error => console.log(error))
            .finally(() => setLoadingUsers(false));

        agent.Service.GetServices(user!.email)
            .then(service => dispatch(setServices(service)))
            .catch(error => console.log(error))
            .finally(() => setLoadingS(false))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function handleOnSubmitAddService(data: FieldValues) {
        setLoadingSubmit(true);
        data.files = pictures;
        data.Price = data.Price * 100;
        data.currentStatus = statusLocal * 1;
        data.plannedDateOfCompletion = dateLocal;
        data.clientEmail = users.find((x: User) => x.username === data.ClientUsername)?.email;

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
        data.Id = id;
        data.files = pictures;
        data.Price = data.Price * 100;
        data.currentStatus = statusLocal * 1;
        data.plannedDateOfCompletion = dateLocal;
        data.clientEmail = users.find((x: User) => x.username === data.ClientUsername)?.email;

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
            navigate(location.state?.from || '/services/' + id);
        }
    }

    function handleUploadImage(event: any) {
        let file = event.target.files[0];
        EncryptPictureToArray(file, setPictures);
    }

    if (loadingUsers || loadingS)
        return <LoadingComponent message='Loading form...' />

    if (!service?.find(x => x.id === parseInt(id!)) && !newService)
        return <NotFound />

    if (selectedImage)
        return <ServicePreviewImage selectedImage={selectedImage} setSelectedImage={setSelectedImage} />

    return (
        <Grid container spacing={6} marginBottom={10}>
            <Grid item xs={12}>
                <AppTextInput
                    label={t("name")}
                    content={!newService ? findServiceId(service, id).name : ''}
                    name='name'
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
                            onChange={handleUploadImage}
                            hidden
                        /></Button>
                </Grid>
                <Grid item xs={12}>
                    <Grid container>
                        {pictures.map(url => (
                            <Grid item key={url} xs={4}>
                                <Card sx={{ maxWidth: 345, marginTop: 5 }}>
                                    <Button onClick={() => setSelectedImage(url)}>
                                        <img src={url} alt={url} style={{ margin: '10px', width: '310px', }} />
                                    </Button>
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
                                    <AppSelectList
                                        label={t("clientName")}
                                        items={users.map(element => {
                                            return element.username;
                                        })}
                                        name="ClientUsername"
                                        control={control}
                                        value={!newService ? findServiceId(service, id).clientUsername : ''}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <AppTextInput
                                        label={t("description")}
                                        content={!newService ? findServiceId(service, id).description : ''}
                                        name="Description"
                                        control={control}
                                        fullWidth
                                        multiline
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label={t("finishDate")}
                                            defaultValue={!newService && findServiceId(service, id).plannedDateOfCompletion ? dayjs(findServiceId(service, id).plannedDateOfCompletion) : dayjs(new Date())}
                                            onChange={(e) => {
                                                setDateLocal(CreateSendDate(e!.year(), (e!.month() + 1), e!.date()))
                                            }}
                                        />
                                    </LocalizationProvider>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <AppTextInput
                                        label={t("price")}
                                        content={!newService ? (findServiceId(service, id).price / 100).toString() : '0'}
                                        name="Price"
                                        control={control}
                                        fullWidth
                                        type="number"
                                        inputProps={{
                                            step: 0.5,
                                            min: 0,
                                        }}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Typography variant="h5" paddingBottom={3}>{t("status")}</Typography>
                                    <RadioButtonGroup
                                        options={statusItems}
                                        selectedValue={statusLocal}
                                        onChange={(e) => setStatusLocal(e.target.value)}
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