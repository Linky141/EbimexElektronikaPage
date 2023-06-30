import { TableRow, TableCell, TextField } from "@mui/material";
import { UseControllerProps, useController } from "react-hook-form";

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
                        <TextField
                            {...field}
                            defaultValue={props.defaultValue}
                            fullWidth
                            label={props.label}
                        />
                    </TableCell>
                </TableRow>
            )}
        </>
    )
}