import { TableRow, TableCell, Checkbox, FormControlLabel } from "@mui/material";
import { useEffect, useState } from "react";
import { Control, UseFormSetValue } from "react-hook-form";
import { useTranslation } from "react-i18next";
import AppTextInput from "../../app/components/AppTextInput";

interface Props {
    nameStart: string;
    nameEnd: string;
    day: string;
    open: string;
    close: string;
    editMode: boolean;
    control: Control<any>;
    setValue: UseFormSetValue<any>;
}

export default function InfoOpenedHoursTableRow(props: Props) {
    const { t } = useTranslation();
    const [isClosed, setIsClosed] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);


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

    useEffect(() => {
        if (props.open === "Closed" || props.close === "Closed")
            setIsClosed(true);
        else
            setIsClosed(false);

        if (props.open === "" || props.close === "")
            setIsEmpty(true);
    }, [props.close, props.open])

    return (
        <>
            {!props.editMode ? (
                <TableRow>
                    <TableCell>{props.day}</TableCell>
                    {!isClosed ? (
                        <>
                            {!isEmpty ? (
                                <TableCell>{props.open} - {props.close}</TableCell>
                            ) : (
                                <TableCell />
                            )}
                        </>

                    ) : (
                        <TableCell>{t("closed")}</TableCell>
                    )}

                </TableRow>
            ) : (
                <>
                    <TableRow>
                        <TableCell>{props.day}</TableCell>
                        <TableCell>
                            <AppTextInput
                                label={t("from")}
                                content={!isClosed ? props.open : "Closed"}
                                fullWidth={false}
                                disabled={isClosed ? true : false}
                                name={props.nameStart}
                                control={props.control}
                            />
                            <AppTextInput
                                label={t("to")}
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
                                label={t("closed")}
                            />
                        </TableCell>
                    </TableRow>
                </>
            )}
        </>
    )
}