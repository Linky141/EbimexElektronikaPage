import { TextField } from "@mui/material";
import { UseControllerProps, useController } from "react-hook-form";

interface Props extends UseControllerProps {
    label: string;
    content: string;
    fullWidth: boolean;
    disabled: boolean;
}

export default function InfoOpenHoursTextField(props: Props) {
    const { field } = useController({ ...props, defaultValue: props.content });

    return (
        <TextField
            {...field}
            defaultValue={props.defaultValue}
            fullWidth={props.fullWidth}
            label={props.label}
            disabled={props.disabled}
        />
    )
}