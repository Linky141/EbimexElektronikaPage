import { AppBar, Box, List, ListItem, Toolbar, Typography } from "@mui/material";
import { t } from "i18next";
import { NavLink } from "react-router-dom";
import OptionsMenu from "./OptionsMenu";
import HomeIcon from '@mui/icons-material/Home';
import { useAppSelector } from "../service/configureService";

interface Props {
    darkMode: boolean;
    handleThemeChange: () => void;
    appLanguage: boolean;
    handleLanguageChange: () => void;
}

const navStyles = {
    color: 'inherit',
    textDecoration: 'none',
    typography: 'h6',
    '&:hover': {
        color: 'grey.500'
    },
    '&.active': {
        color: 'text.secondary'
    }
}

export default function Header({ darkMode, handleThemeChange, appLanguage, handleLanguageChange }: Props) {
    const { user } = useAppSelector(state => state.account);

    const midLinks = [
        { title: t("info"), path: '/info' },
        { title: t("contact"), path: '/contact' },
        { title: t("services"), path: '/services' }
    ]

    return (
        <AppBar position="static" sx={{ mb: 4 }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box display='flex' width={100}>
                    <OptionsMenu
                        darkMode={darkMode}
                        handleThemeChange={handleThemeChange}
                        appLanguage={appLanguage}
                        handleLanguageChange={handleLanguageChange}
                    />
                    <Typography component={NavLink} to='/' sx={navStyles}>
                        <HomeIcon sx={{ fontSize: 40, marginTop: 1, marginLeft: 2 }} />
                    </Typography>
                    {user ? (
                        <Typography variant="h6" sx={{marginTop: 1.5, marginLeft: 2 }}> {user?.email.toUpperCase()}</Typography>
                    ) : (<></>)}
                </Box>
                <List sx={{ display: 'flex'}}>
                    {midLinks.map(({ title, path }) => (
                        <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
                            {title.toUpperCase()}
                        </ListItem>
                    ))}
                </List>
                <Box width={100}>
                    <Typography variant="h6"> EBIMEX </Typography>
                </Box>
            </Toolbar>
        </AppBar>
    )
}