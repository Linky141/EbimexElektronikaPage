import { Button, Grid, List, ListItem, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Service } from "../../app/models/service";
import Moment from 'moment';
import ServiceStatus from "./ServiceStatus";
import ServiceCommentComponent from "./ServiceCommentComponent";
import ServicePreviewImage from "./ServicePreviewImage";
import agent from "../../app/api/agent";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";

export default function ServiceDetails() {
    const { id } = useParams<{ id: string }>();
    const [service, setService] = useState<Service | null>(null);
    const [loading, setLoading] = useState(true);
    const [addingCommentState, setaddingCommentState] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        agent.Service.details(parseInt(id!))
            .then(response => setService(response))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }, [id]);

    if (loading)
        return <LoadingComponent message="Loading service details..."/>
    if (!service)
        return <NotFound/>
    if (selectedImage)
        return <ServicePreviewImage selectedImage={selectedImage} setSelectedImage={setSelectedImage} />

    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Typography variant="h3">
                    {service.name}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <List sx={{ display: 'flex' }}>
                    {service.pictureUrls.map(({ url, id }) => (
                        <ListItem key={id}>
                            <Button onClick={() => setSelectedImage(url)}>
                                <img src={url} alt={url} style={{ margin: '10px', width: '300px' }} />
                            </Button>
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
                                <TableCell>Description</TableCell>
                                <TableCell>{service.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Finish date</TableCell>
                                <TableCell>{Moment(service.plannedDateOfCompletion).format('DD-MM-YYYY')}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Price</TableCell>
                                <TableCell>{(service.price / 100).toFixed(2)} PLN</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Status</TableCell>
                                <TableCell>
                                    <ServiceStatus status={service.currentStatus} fontSize={14} color={"text.secondary"} gutterBottom={true} />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h4">Comments</Typography>
                <Grid container >
                    {service.comments.map(({ content, dateTime, user, id }) => (
                        <Grid item xs={12} key={id}>
                            <ServiceCommentComponent content={content} dateTime={dateTime} user={user} />
                        </Grid>
                    ))}
                </Grid>
                <Grid>
                    {addingCommentState ? (
                        <form>
                            <Grid marginLeft="30px" marginRight="30px">
                                <TextField
                                    id="outlined-basic"
                                    label="Comment"
                                    variant="outlined"
                                    multiline
                                    fullWidth
                                />
                            </Grid>
                            <Grid marginTop="10px" display="flex" justifyContent="flex-end" marginRight="30px" marginBottom="5px">
                                <Button type="submit" variant="contained">Add</Button>
                            </Grid>
                        </form>
                    ) : (
                        <Grid display="flex" justifyContent="flex-end" marginRight="30px" marginBottom="70px">
                            <Button variant="contained" onClick={() => setaddingCommentState(true)}>Add comment</Button>
                        </Grid>
                    )}

                </Grid>
            </Grid>
        </Grid>
    )
}