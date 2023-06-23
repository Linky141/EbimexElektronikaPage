import { useState, useEffect } from "react";
import { Contact } from "../../app/models/contact";
import { Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";

export default function ContactPage() {
    const [contacts, setContacts] = useState<Contact[]>([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/contacts')
            .then(response => response.json())
            .then(data => setContacts(data));
    }, [])

    return (
        <>
            {contacts.map(contact => (
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant="h4">Address</Typography>
                        <TableContainer>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Country</TableCell>
                                        <TableCell>{contact.addressCountry}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>City</TableCell>
                                        <TableCell>{contact.addressCity}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Postal code</TableCell>
                                        <TableCell>{contact.addressPostal}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Street</TableCell>
                                        <TableCell>{contact.addressStreet}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Building number</TableCell>
                                        <TableCell>{contact.addressNumber1}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Apartment number</TableCell>
                                        <TableCell>{contact.addressNumber2}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h4">Contact</Typography>
                        <TableContainer>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Phone</TableCell>
                                        <TableCell>{contact.phone}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Phone 2</TableCell>
                                        <TableCell>{contact.phone2}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Email</TableCell>
                                        <TableCell>{contact.email}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Email 2</TableCell>
                                        <TableCell>{contact.email2}</TableCell>
                                    </TableRow>
                                    {contact.contactCustoms.map(customContact => (
                                        <TableRow>
                                            <TableCell>{customContact.name}</TableCell>
                                            <TableCell>{customContact.content}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            ))
            }
        </>
    )
}