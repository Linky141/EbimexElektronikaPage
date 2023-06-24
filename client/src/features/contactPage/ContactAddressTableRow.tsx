import { TableRow, TableCell, TextField } from "@mui/material";
import { useState, useEffect } from "react";

interface Props {
    fieldName: string;
    fieldValue: string;
    editAddressMode: boolean;
}

export default function ContactAddressTableRow({ editAddressMode, fieldName, fieldValue }: Props) {
    const [fieldValueData, setFieldValueData] = useState<string>();

    useEffect(() => {
        setFieldValueData(fieldValue)
    }, [fieldValue]);

    return (
        <>
            {!editAddressMode ? (
                <TableRow>
                    <TableCell>{fieldName}</TableCell>
                    <TableCell>{fieldValue}</TableCell>
                </TableRow>
            ) : (
                <TableRow>
                    <TableCell>
                        <TextField
                            value={fieldValueData}
                            onChange={e => setFieldValueData(e.target.value)}
                            fullWidth
                            label={fieldName}
                        />
                    </TableCell>
                </TableRow>
            )}
        </>
    )
}