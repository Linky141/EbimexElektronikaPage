import { Grid, Typography, Button } from "@mui/material";
import { Contact } from "../../app/models/contact";
import ContactAddressTable from "./ContactAddressTable";
import { Control, FieldValues, UseFormHandleSubmit } from "react-hook-form";
import { LoadingButton } from "@mui/lab";

interface Props {
    contact: Contact;
    setEditAddressMode: React.Dispatch<React.SetStateAction<boolean>>;
    control: Control<FieldValues, any>;
    editAddressMode: boolean;
    loadingSubmit: boolean;
    handleSubmit: UseFormHandleSubmit<FieldValues, undefined>;
    handleOnSubmitAddress: (data: FieldValues) => void;
}

export default function ContactAddressEdit(props: Props) {
    return (
        <Grid container>
            <Grid item>
                <Typography variant="h4">Address</Typography>
            </Grid>
            <Grid item>
                <LoadingButton
                    loading={props.loadingSubmit}
                    onClick={props.handleSubmit(props.handleOnSubmitAddress)}
                    color="success"
                >Submit</LoadingButton>
                <Button onClick={() => props.setEditAddressMode(false)} color="error">Cancel</Button>
            </Grid>
            <ContactAddressTable
                contact={props.contact}
                control={props.control}
                editAddressMode={props.editAddressMode}
            />
        </Grid>
    )
}