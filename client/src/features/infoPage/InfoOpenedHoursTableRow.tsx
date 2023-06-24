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

    const [openSt, setOpenSt] = useState<string>("");
    const [closeSt, setCloseSt] = useState<string>("");

    useEffect(() => {
        setOpenSt(open);
        setCloseSt(close);
        if (open === "Closed" || close === "Closed")
            setIsClosed(true);
        else
            setIsClosed(false);
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

    return (
        <>
            {!editMode ? (
                <TableRow>
                    <TableCell>{day}</TableCell>
                    {!isClosed ? (
                        <TableCell>{openSt} - {closeSt}</TableCell>
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
                                onChange={e => setOpenSt(e.target.value)}
                            />
                            <TextField
                                id="outlined-basic"
                                label="To"
                                variant="outlined"
                                value={!isClosed ? closeSt : "Closed"}
                                disabled={isClosed ? true : false}
                                onChange={e => setCloseSt(e.target.value)}
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