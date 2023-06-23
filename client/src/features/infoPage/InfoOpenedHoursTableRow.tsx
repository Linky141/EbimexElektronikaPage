import { TableRow, TableCell, TextField, Checkbox, FormControlLabel } from "@mui/material";
import { useEffect, useState } from "react";

interface Props {
    day: string;
    open: string;
    close: string;
    editMode: boolean;
}

export default function InfoOpenedHoursTableRow({ day, close, open, editMode }: Props) {
    const [isClosed, setIsClosed] = useState(false);

    const [openSt, setOpenSt] = useState<string>();
    const [closeSt, setCloseSt] = useState<string>();

    useEffect(() => {
        if (open === "Closed" || close === "Closed")
            setIsClosed(true);
        else
            setIsClosed(false);

            setOpenSt(open);
            setCloseSt(close);
    }, [close, open]);

    function ChangeClosed() {
        if (!isClosed) {
            setOpenSt("Closed");
            setCloseSt("Closed");
        }
        else {
            setOpenSt("");
            setCloseSt("");
        }
        setIsClosed(!isClosed);
    }

    const onChangeOpen = (event: any) => {
        setOpenSt(event.target.value)
       }

       const onChangeClose = (event: any) => {
        setCloseSt(event.target.value)
       }

    return (
        <>
            {!editMode ? (
                <TableRow>
                    <TableCell>{day}</TableCell>
                    {!isClosed ? (
                        <TableCell>{openSt} - {close}</TableCell>
                    ) : (
                        <TableCell>Closed</TableCell>
                    )}

                </TableRow>
            ) : (
                <>
                    <TableRow>
                        <TableCell>{day}</TableCell>
                        <TableCell>
                            <TextField
                                id="outlined-basic"
                                label="From"
                                variant="outlined"
                                value={!isClosed ? openSt : "Closed"}
                                disabled={isClosed ? true : false}
                                onChange={onChangeOpen}
                            />
                            <TextField
                                id="outlined-basic"
                                label="To"
                                variant="outlined"
                                value={!isClosed ? closeSt : "Closed"}
                                disabled={isClosed ? true : false}
                                onChange={onChangeClose}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox checked={isClosed} onChange={() => ChangeClosed()} />
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