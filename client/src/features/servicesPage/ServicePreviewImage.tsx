import { Button, Grid, Paper } from "@mui/material";
import { useTranslation } from "react-i18next";

interface Props {
    selectedImage: string;
    setSelectedImage: (item: string | null) => void;
}

export default function ServicePreviewImage({ selectedImage, setSelectedImage }: Props) {
    const {t} = useTranslation()

    return (
        <Grid container spacing={2}>
        <Grid item xs={12}>
            <Button variant="contained" onClick={() => setSelectedImage(null)}>{t("back")}</Button>
        </Grid>
        <Grid item xs={12}>
            <Paper style={{maxHeight: '800px', overflow: 'auto'}}>
            <img src={selectedImage} alt={selectedImage}  />
            </Paper>

        </Grid>
    </Grid>
    )
}