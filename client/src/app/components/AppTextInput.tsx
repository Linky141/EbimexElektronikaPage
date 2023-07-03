import { TextField, TextFieldVariants } from "@mui/material";
import { UseControllerProps, useController } from "react-hook-form";

interface Props extends UseControllerProps {
    label: string;
    content: string;
    fullWidth?: boolean;
    variant?: TextFieldVariants;
    multiline?: boolean;
}

export default function AppTextInput(props: Props) {
    const { field } = useController({ ...props, defaultValue: props.content });
    return (
        <TextField
            {...field}
            defaultValue={props.defaultValue}
            fullWidth={props.fullWidth}
            label={props.label}
            variant={props.variant}
            multiline={props.multiline}
        />
    )
}