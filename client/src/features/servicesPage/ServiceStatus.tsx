import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

interface Props {
    status: number;
    fontSize: number;
    color: string;
    gutterBottom: boolean;
}

export default function ServiceStatus({ status, color, fontSize, gutterBottom }: Props) {
    const { t } = useTranslation();
    
    return (
        <Typography sx={{ fontSize: fontSize }} color={color} gutterBottom={gutterBottom}>
            {status === 0 ? t("notStarted") :
                status === 1 ? t("opened") :
                    status === 2 ? t("waitingForComponents") :
                        status === 3 ? t("testing") :
                            status === 4 ? t("readyToBePickedUp") :
                                status === 5 ? t("releasedToCustomer") :
                                    t("error")}
        </Typography>
    )
}