import { AppBar, Box, List, ListItem, Toolbar, Typography } from "@mui/material";
import { t } from "i18next";
import { NavLink } from "react-router-dom";
import OptionsMenu from "./OptionsMenu";

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
                <Box display='flex' alignItems='center'>
                    <Typography variant="h6" component={NavLink} to='/' sx={navStyles}>
                        {t("title")}
                    </Typography>
                </Box>
                <List sx={{ display: 'flex' }}>
                    {midLinks.map(({ title, path }) => (
                        <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
                            {title.toUpperCase()}
                        </ListItem>
                    ))}
                </List>
                <Box display='flex' alignItems='center'>
                    <OptionsMenu
                        darkMode={darkMode}
                        handleThemeChange={handleThemeChange}
                        appLanguage={appLanguage}
                        handleLanguageChange={handleLanguageChange}
                        rightLinks={rightLinks}
                    />
                </Box>
            </Toolbar>
        </AppBar>
    )
}