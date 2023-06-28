import { TextField } from "@mui/material";
import { UseControllerProps, useController } from "react-hook-form";

interface Props extends UseControllerProps {
    label: string;
    content: string;
    fullWidth: boolean;
}

export default function ContactContactsTextField(props: Props) {
    const { field } = useController({ ...props, defaultValue: props.content });

    return (
        <TextField
            {...field}
            defaultValue={props.defaultValue}
            fullWidth={props.fullWidth}
            label={props.label}
        />
    )
}