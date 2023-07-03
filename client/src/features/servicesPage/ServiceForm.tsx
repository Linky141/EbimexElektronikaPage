import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/service/configureService";
import { useEffect, useState } from "react";
import { Button, Grid, List, ListItem, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { Service } from "../../app/models/service";
import AppTextInput from "../../app/components/AppTextInput";
import { FieldValues, useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import agent from "../../app/api/agent";
import { setServices } from "./servicesSlice";

export default function ServiceForm() {
    const { id } = useParams<{ id: string }>();
    const { service } = useAppSelector(state => state.services);
    const [serviceEdit, setServiceEdit] = useState<Service>(init);
    const [newService, setNewService] = useState(true);
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const { control, handleSubmit } = useForm();
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();

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

        agent.Service
            .addService(data)
            .then(service => dispatch(setServices(service)))
            .catch(error => console.log(error))
            .finally(finishActions);

        function finishActions() {
            setLoadingSubmit(false);
            navigate(location.state?.from || '/services');
        }
    }



    useEffect(() => {
        if (serviceEdit.id !== 0)
            setNewService(false);
    }, [serviceEdit.id])

    return (
        <Grid container spacing={6} marginBottom={10}>
            <Grid item xs={12}>
                <AppTextInput
                    label="Name"
                    content={serviceEdit!.name}
                    name="Name"
                    control={control}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12}>
                <List sx={{ display: 'flex' }}>
                    {serviceEdit!.pictureUrls.map(({ url, id }) => (
                        <ListItem key={id}>
                            {/* <Button onClick={() => setSelectedImage(url)}> */}
                            <img src={url} alt={url} style={{ margin: '10px', width: '300px' }} />
                            {/* </Button> */}
                        </ListItem>
                    ))}
                </List>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h4">Details</Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <AppTextInput
                                        label="Description"
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
                                        label="Finish date"
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
                                        label="Price"
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
                                        label="Status"
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
                    >Add</LoadingButton>
                    // <Button fullWidth color="success" variant="outlined" onClick={}>Add</Button>
                ) : (
                    <Button fullWidth color="success" variant="outlined">Submit</Button>
                )}

            </Grid>
            <Grid item xs={6}>
                <Button fullWidth color="error" variant="outlined">Cancel</Button>
            </Grid>
        </Grid>
    )
}