import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function NotFound(){
    const { t } = useTranslation();
    
    return(
        <Container component={Paper} sx={{height: 400}}>
            <Typography gutterBottom variant="h3">{t("error404")}</Typography>
            <Typography gutterBottom variant="h6">{t("pageNotFound")}</Typography>
            <Divider/>
            <Button fullWidth component={Link} to='/'>{t("GoBackToHomePage")}</Button>
        </Container>
    )
}