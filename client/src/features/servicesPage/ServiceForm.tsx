import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/service/configureService";
import { useCallback, useEffect, useState } from "react";
import { Button, Card, CardActions, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import AppTextInput from "../../app/components/AppTextInput";
import { FieldValues, useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
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
import { User } from "../../app/models/user";
import NotFound from "../../app/errors/NotFound";
import { addServicesAsync, updateServicesAsync } from "./servicesSlice";
import { fetchUsersAsync } from "../account/accountSlice";
import LoadingComponent from "../../app/layout/LoadingComponent";


export default function ServiceForm() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams<{ id: string }>();
    const { services } = useAppSelector(state => state.services);
    const { control, handleSubmit, formState: { isSubmitting } } = useForm<any>({
        resolver: yupResolver(ServiceFormSchema())
    });
    const { t } = useTranslation();
    const { users } = useAppSelector(state => state.account);
    const [pictures, setPictures] = useState<string[]>(id === '0' ? () => { return [] } : () => { return findServiceId(services, id).pictureUrls.map(element => element.url) });
    const [statusLocal, setStatusLocal] = useState<number>(id === '0' ? () => { return 0 } : () => { return findServiceId(services, id).currentStatus });
    const [dateLocal, setDateLocal] = useState<string>(id === '0' ? () => { return dayjs(new Date()).toISOString() } : () => { return findServiceId(services, id).plannedDateOfCompletion });
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [newService] = useState(id === '0');
    const [loadingUsers, setLoadingUsers] = useState(true);

    const statusItems = [
        { value: 0, label: t("notStarted") },
        { value: 1, label: t("opened") },
        { value: 2, label: t("waitingForComponents") },
        { value: 3, label: t("testing") },
        { value: 4, label: t("readyToBePickedUp") },
        { value: 5, label: t("releasedToCustomer") }
    ];

    const initUsers = useCallback(async () => {
        try {
            await dispatch(fetchUsersAsync());
        } catch (error) {
            console.log(error);
        }
    }, [dispatch])

    useEffect(() => {
        initUsers().then(() => setLoadingUsers(false));
    }, [initUsers])

    async function submitFormAdd(data: FieldValues) {
        try {
            data.files = pictures;
            data.Price = data.Price * 100;
            data.currentStatus = statusLocal * 1;
            data.plannedDateOfCompletion = dateLocal;
            data.clientEmail = users!.find((x: User) => x.username === data.ClientUsername)?.email;
            await dispatch(addServicesAsync(data));
        } catch (error) {
            console.log(error);
        } finally {
            navigate(location.state?.from || '/services');
        }
    }

    async function submitFormEdit(data: FieldValues) {
        try {
            data.Id = id;
            data.files = pictures;
            data.Price = data.Price * 100;
            data.currentStatus = statusLocal * 1;
            data.plannedDateOfCompletion = dateLocal;
            data.clientEmail = users!.find((x: User) => x.username === data.ClientUsername)?.email;
            await dispatch(updateServicesAsync(data));
        } catch (error) {
            console.log(error);
        } finally {
            navigate(location.state?.from || '/services/' + id);
        }
    }

    function handleUploadImage(event: any) {
        let file = event.target.files[0];
        EncryptPictureToArray(file, setPictures);
    }

    if (loadingUsers)
        return <LoadingComponent />
    if (!services?.find(x => x.id === parseInt(id!)) && !newService)
        return <NotFound />
    if (selectedImage)
        return <ServicePreviewImage selectedImage={selectedImage} setSelectedImage={setSelectedImage} />

    return (
        <Grid container spacing={6} marginBottom={10}>
            <Grid item xs={12}>
                <AppTextInput
                    label={t("name")}
                    content={!newService ? findServiceId(services, id).name : ''}
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
                                        items={users!.map(element => {
                                            return element.username;
                                        })}
                                        name="ClientUsername"
                                        control={control}
                                        value={!newService ? findServiceId(services, id).clientUsername : ''}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <AppTextInput
                                        label={t("description")}
                                        content={!newService ? findServiceId(services, id).description : ''}
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
                                            defaultValue={!newService && findServiceId(services, id).plannedDateOfCompletion ? dayjs(findServiceId(services, id).plannedDateOfCompletion) : dayjs(new Date())}
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
                                        content={!newService ? (findServiceId(services, id).price / 100).toString() : '0'}
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
                        loading={isSubmitting}
                        onClick={handleSubmit(submitFormAdd)}
                        fullWidth
                        color="success"
                        variant="outlined"
                    >{t("add")}</LoadingButton>
                ) : (
                    <LoadingButton
                        loading={isSubmitting}
                        onClick={handleSubmit(submitFormEdit)}
                        fullWidth
                        color="success"
                        variant="outlined"
                    >{t("save")}</LoadingButton>
                )}

            </Grid>
            <Grid item xs={6}>
                <Button fullWidth color="error" variant="outlined" onClick={() => navigate(location.state?.from || '/services')}>{t("cancel")}</Button>
            </Grid>
        </Grid>
    )
}