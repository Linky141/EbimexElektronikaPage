import { Grid, Typography, TypographyTypeMap } from "@mui/material";
import { CSSProperties } from "react";

interface Props {
    content: string;
    variant?: TypographyTypeMap["props"]["variant"];
    containerStyle?: CSSProperties;
    style?: CSSProperties;
}

export default function AppShowTextMultiline(props: Props) {
    return (
        <Grid style={props.containerStyle}>
            {props.content && props.content.split("\n").map((i, key) => {
                if (props.variant)
                    return <Typography variant={props.variant} key={key} style={props.style}>{i}</Typography>;
                else
                    return <div key={key} style={props.style}>{i}</div>;
            })}
        </Grid>
    )
}