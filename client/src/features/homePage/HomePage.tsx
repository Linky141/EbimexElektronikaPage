import { Button, ButtonGroup, Container, Typography } from "@mui/material";
import agent from "../../app/api/agent";

export default function HomePage() {
    return (
        <Container>
            <Typography variant="h1">
                Test error
            </Typography>
            <ButtonGroup fullWidth>
                <Button variant="contained" onClick={() => agent.TestErrors.get400Error().catch(error => console.log(error))}>400</Button>
                <Button variant="contained" onClick={() => agent.TestErrors.get401Error().catch(error => console.log(error))}>401</Button>
                <Button variant="contained" onClick={() => agent.TestErrors.get404Error().catch(error => console.log(error))}>404</Button>
                <Button variant="contained" onClick={() => agent.TestErrors.get500Error().catch(error => console.log(error))}>500</Button>
                <Button variant="contained" onClick={() => agent.TestErrors.getValidationError().catch(error => console.log(error))}>Validation</Button>
            </ButtonGroup>
        </Container>
    )
}