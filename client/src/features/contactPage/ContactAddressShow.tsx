import { Grid, Typography, Button } from "@mui/material";
import { Contact } from "../../app/models/contact";
import ContactAddressTable from "./ContactAddressTable";
import { Control, FieldValues } from "react-hook-form";

interface Props {
    contact: Contact;
    setEditAddressMode: React.Dispatch<React.SetStateAction<boolean>>;
    control: Control<FieldValues, any>;
    editAddressMode: boolean;
}

export default function ContactAddressShow(props: Props) {
    return (
        <Grid container>
            <Grid item>
                <Typography variant="h4">Address</Typography>
            </Grid>
            <Grid item>
                <Button onClick={() => props.setEditAddressMode(true)}>Edit</Button>
            </Grid>
            <ContactAddressTable
                contact={props.contact}
                control={props.control}
                editAddressMode={props.editAddressMode}
            />
        </Grid>
    )
}