import { Card, Button, CardActions, CardContent, Typography } from "@mui/material";
import { Service } from "../../app/models/service";
import Moment from 'moment';

interface Props {
    service: Service;
}

export default function ServiceCard({ service }: Props) {
    return (
        <Card>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {service.currentStatus === 0 ? 'Not started' : 
                    service.currentStatus === 1 ? 'Opened' :
                    service.currentStatus === 2 ? 'Waiting for components' :
                    service.currentStatus === 3 ? 'Testing' :
                    service.currentStatus === 4 ? 'Ready to be picked up' :
                    service.currentStatus === 5 ? 'Released to customer' :
                    '#error'}
                </Typography>
                <Typography variant="h5" component="div">
                    {service.name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                   Deadline: {Moment(service.plannedDateOfCompletion).format('DD-MM-YYYY')}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {(service.price / 100).toFixed(2)} PLN
                </Typography>
                <Typography variant="body2">
                    {service.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>


        // <ListItem key={service.id}>
        //     <ListItemAvatar>
        //         <Avatar src={service.pictureUrls.at(0)?.url} />
        //     </ListItemAvatar>
        //     <ListItemText>
        //         {service.name} - {service.price}
        //     </ListItemText>
        // </ListItem>
    )
}