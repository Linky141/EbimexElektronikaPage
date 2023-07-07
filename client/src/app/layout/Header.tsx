import { AppBar, Box, List, ListItem, Toolbar, Typography } from "@mui/material";
import { t } from "i18next";
import { NavLink } from "react-router-dom";
import OptionsMenu from "./OptionsMenu";
import HomeIcon from '@mui/icons-material/Home';

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
    const midLinks = [
        { title: t("info"), path: '/info' },
        { title: t("contact"), path: '/contact' },
        { title: t("services"), path: '/services' }
    ]

    const rightLinks = [
        { title: t("login"), path: '/login' },
        { title: t("register"), path: '/register' }
    ]

    return (
        <AppBar position="static" sx={{ mb: 4 }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box display='flex'>
                    <OptionsMenu
                        darkMode={darkMode}
                        handleThemeChange={handleThemeChange}
                        appLanguage={appLanguage}
                        handleLanguageChange={handleLanguageChange}
                        rightLinks={rightLinks}
                    />
                    <Typography component={NavLink} to='/' sx={navStyles}>
                        <HomeIcon sx={{ fontSize: 40, marginTop: 1, marginLeft: 2 }} />
                    </Typography>

                </Box>
                <List sx={{ display: 'flex' }}>
                    {midLinks.map(({ title, path }) => (
                        <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
                            {title.toUpperCase()}
                        </ListItem>
                    ))}
                </List>
                <Box>
                    <Typography variant="h6"> EBIMEX </Typography>
                </Box>
            </Toolbar>
        </AppBar>
    )
}