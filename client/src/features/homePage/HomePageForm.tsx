import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/service/configureService";
import { useState } from "react";
import { Button, Card, CardActions, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import AppTextInput from "../../app/components/AppTextInput";
import { FieldValues, useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { useTranslation } from "react-i18next";
import { EncryptPictureToArray } from "../../app/utils/Base64Utils";
// import ServicePreviewImage from "./ServicePreviewImage";
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
import ServicePreviewImage from "../servicesPage/ServicePreviewImage";
import { updateHomePageAsync } from "./homePageSlice";
// import { addServicesAsync, updateServicesAsync } from "./servicesSlice";


export default function HomePageForm() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    // const { id } = useParams<{ id: string }>();
    // const { services } = useAppSelector(state => state.services);
    const { control, handleSubmit, formState: { isSubmitting } } = useForm();
    // const { control, handleSubmit, formState: { isSubmitting } } = useForm<any>({
    //     resolver: yupResolver(ServiceFormSchema())
    // });
    const { t } = useTranslation();
    const { homePage } = useAppSelector(state => state.homePage);
    // const { users } = useAppSelector(state => state.account);

    const [pictures, setPictures] = useState<string[]>(() => { return homePage!.pictureUrls.map(element => element.url) });
    // const [statusLocal, setStatusLocal] = useState<number>(id === '0' ? () => {return 0} : () => {return findServiceId(services, id).currentStatus});
    // const [dateLocal, setDateLocal] = useState<string>(id === '0' ? () => {return dayjs(new Date()).toISOString()} : () => {return findServiceId(services, id).plannedDateOfCompletion});
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    // const [newService] = useState(id === '0');


    async function submitFormEdit(data: FieldValues) {
        try {
            data.Id = "1";
            data.files = pictures;
            await dispatch(updateHomePageAsync(data));
        } catch (error) {
            console.log(error);
        } finally {
            navigate(location.state?.from || '/');
        }
    }

    function handleUploadImage(event: any) {
        let file = event.target.files[0];
        EncryptPictureToArray(file, setPictures);
    }

    if (selectedImage)
        return <ServicePreviewImage selectedImage={selectedImage} setSelectedImage={setSelectedImage} />

    return (
        <Grid container spacing={6} marginBottom={10}>
            <Grid item xs={12}>
                <LoadingButton loading={isSubmitting} onClick={handleSubmit(submitFormEdit)} fullWidth color="success" variant="outlined" style={{ width: '65%', margin: 5 }}>{t("save")}</LoadingButton>
                <Button fullWidth color="error" variant="outlined" onClick={() => navigate(location.state?.from || '/')} style={{ width: '33%', margin: 5 }}>{t("cancel")}</Button>
            </Grid>
            <Grid item xs={12}>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <AppTextInput
                                        label={t("header")}
                                        content={homePage!.header}
                                        name='header'
                                        control={control}
                                        fullWidth
                                        multiline
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <AppTextInput
                                        label={t("description")}
                                        content={homePage!.description}
                                        name='description'
                                        control={control}
                                        fullWidth
                                        multiline
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
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
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    )
}