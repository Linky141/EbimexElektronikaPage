import { TableRow, TableCell } from "@mui/material";
import { UseControllerProps, useController } from "react-hook-form";
import AppTextInput from "../../app/components/AppTextInput";

interface Props extends UseControllerProps {
    label: string;
    content: string;
    editaddressmode: boolean;
}

export default function ContactAddressTableRow(props: Props) {
    const { field } = useController({ ...props, defaultValue: props.content });

    return (
        <>
            {!props.editaddressmode ? (
                <>
                    {props.content ? (
                        <TableRow>
                            <TableCell>{props.label}</TableCell>
                            <TableCell>{props.content}</TableCell>
                        </TableRow>
                    ) : (<></>)}
                </>
            ) : (
                <TableRow>
                    <TableCell>
                        <AppTextInput
                            {...field}
                            content={props.content}
                            defaultValue={props.defaultValue}
                            fullWidth
                            label={props.label}
                            control={props.control}
                        />
                    </TableCell>
                </TableRow>
            )}
        </>
    )
}