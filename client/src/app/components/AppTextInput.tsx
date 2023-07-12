import { TextField, TextFieldVariants } from "@mui/material";
import { UseControllerProps, useController } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface Props extends UseControllerProps<any> {
    label: string;
    content: string;
    fullWidth?: boolean;
    variant?: TextFieldVariants;
    multiline?: boolean;
    type?: string;
    disabled?: boolean;
    inputProps?: any;
}

export default function AppTextInput(props: Props) {
    const { field, fieldState } = useController({ ...props, defaultValue: props.content });
    const {t} = useTranslation();
    const help = fieldState.error?.message !== undefined ? t(fieldState.error?.message) : '';
    
    return (
        <TextField
            {...props}
            {...field}
            defaultValue={props.defaultValue}
            fullWidth={props.fullWidth}
            label={props.label}
            variant={props.variant}
            multiline={props.multiline}
            type={props.type}
            error={!!fieldState.error}
            helperText={help}
            disabled={props.disabled}
            inputProps={props.inputProps}
        />
    )
}