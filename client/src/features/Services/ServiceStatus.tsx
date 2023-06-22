import { Typography } from "@mui/material";

interface Props {
    status: number;
    fontSize: number;
    color: string;
    gutterBottom: boolean;
}

export default function ServiceStatus({ status, color, fontSize, gutterBottom }: Props) {
    return (
        <Typography sx={{ fontSize: fontSize }} color={color} gutterBottom={gutterBottom}>
            {status === 0 ? 'Not started' :
                status === 1 ? 'Opened' :
                    status === 2 ? 'Waiting for components' :
                        status === 3 ? 'Testing' :
                            status === 4 ? 'Ready to be picked up' :
                                status === 5 ? 'Released to customer' :
                                    '#error'}
        </Typography>
    )
}