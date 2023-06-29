import { TableRow, TableCell, Checkbox, FormControlLabel } from "@mui/material";
import { useState } from "react";
import { Control, FieldValues, UseFormSetValue } from "react-hook-form";
import InfoOpenHoursTextField from "./InfoOpenHoursTextField";

interface Props {
    nameStart: string;
    nameEnd: string;
    day: string;
    open: string;
    close: string;
    editMode: boolean;
    control: Control<FieldValues, any>;
    setValue: UseFormSetValue<FieldValues>;
}

export default function InfoOpenedHoursTableRow(props: Props) {
    const [isClosed, setIsClosed] = useState(false);


    function ChangeClosed() {
        if (!isClosed) {
            props.setValue(props.nameStart, "Closed");
            props.setValue(props.nameEnd, "Closed");
        }
        else {
            props.setValue(props.nameStart, "");
            props.setValue(props.nameEnd, "");
        }
        setIsClosed(!isClosed);
    }

    return (
        <>
            {!props.editMode ? (
                <TableRow>
                    <TableCell>{props.day}</TableCell>
                    {!isClosed ? (
                        <TableCell>{props.open} - {props.close}</TableCell>
                    ) : (
                        <TableCell>Closed</TableCell>
                    )}

                </TableRow>
            ) : (
                <>
                    <TableRow>
                        <TableCell>{props.day}</TableCell>
                        <TableCell>
                            <InfoOpenHoursTextField
                                label="From"
                                content={!isClosed ? props.open : "Closed"}
                                fullWidth={false}
                                disabled={isClosed ? true : false}
                                name={props.nameStart}
                                control={props.control}
                            />
                             <InfoOpenHoursTextField
                                label="To"
                                content={!isClosed ? props.close : "Closed"}
                                fullWidth={false}
                                disabled={isClosed ? true : false}
                                name={props.nameEnd}
                                control={props.control}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox checked={isClosed} onChange={ChangeClosed} />
                                }
                                label="Closed"
                            />
                        </TableCell>
                    </TableRow>
                </>
            )}
        </>
    )
}