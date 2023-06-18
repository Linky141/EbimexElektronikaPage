import { AppBar, FormControlLabel, Switch, Toolbar, Typography } from "@mui/material";

interface Props{
    darkMode: boolean;
    handleThemeChange: () => void;
}

export default function Header({darkMode, handleThemeChange}:Props) {
    return (
        <AppBar position="static" sx={{mb: 4}}>
            <Toolbar>
                <Typography variant="h6">
                    Ebimex elektronika
                </Typography>
                <FormControlLabel style={{ paddingLeft: 20 }} control={<Switch checked={darkMode} onChange={handleThemeChange}/>} label="Dark mode"/>
            </Toolbar>
        </AppBar>
    )
}