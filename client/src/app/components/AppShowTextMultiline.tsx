import { Typography, TypographyTypeMap } from "@mui/material";

interface Props {
    content: string;
    variant?: TypographyTypeMap["props"]["variant"];
}

export default function AppShowTextMultiline(props: Props) {
    return (
        <>
            {props.content && props.content.split("\n").map((i, key) => {
                if (props.variant)
                    return <Typography variant={props.variant}>{i}</Typography>;
                else
                    return <div key={key}>{i}</div>;
            })}
        </>
    )
}