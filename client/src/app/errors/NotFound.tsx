import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFound(){
    return(
        <Container component={Paper} sx={{height: 400}}>
            <Typography gutterBottom variant="h3">Error 404</Typography>
            <Typography gutterBottom variant="h6">Page not found</Typography>
            <Divider/>
            <Button fullWidth component={Link} to='/'>Go back to home page</Button>
        </Container>
    )
}