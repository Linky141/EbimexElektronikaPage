import { AppBar, Box, List, ListItem, Toolbar, Typography } from "@mui/material";
import { t } from "i18next";
import { NavLink } from "react-router-dom";
import OptionsMenu from "./OptionsMenu";
import HomeIcon from '@mui/icons-material/Home';
import { useAppSelector } from "../service/configureService";
import { isAdmin, isMember } from "../utils/RolesUtils";

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
    const { configuration } = useAppSelector(state => state.configuration)


    function getConfig() {
        return configuration!.find(x => x.id === 1)!;
    }

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
                        <Typography variant="h6" sx={{ marginTop: 1.5, marginLeft: 2 }}> {user?.email.toUpperCase()}</Typography>
                    ) : (<></>)}
                </Box>
                <List sx={{ display: 'flex' }}>

                    {configuration && (getConfig().infoEnabled === 0 || (getConfig().infoEnabled === 1 && isMember(user)) || isAdmin(user)) &&
                        <ListItem component={NavLink} to='/info' key='/info' sx={navStyles}>{t("info").toUpperCase()}</ListItem>
                    }

                    {configuration && (getConfig().contactsEnabled === 0 || (getConfig().contactsEnabled === 1 && isMember(user)) || isAdmin(user)) &&
                        <ListItem component={NavLink} to='/contact' key='/contact' sx={navStyles}>{t("contact").toUpperCase()}</ListItem>
                    }

                    {configuration && (getConfig().servicesEnabled === 0 || (getConfig().servicesEnabled === 1 && isMember(user)) || isAdmin(user)) &&
                        <>
                            {isMember(user) &&
                                <ListItem component={NavLink} to='/services' key='/services' sx={navStyles}>{t("services").toUpperCase()}</ListItem>
                            }
                        </>
                    }

                    {isAdmin(user) &&
                        <ListItem component={NavLink} to='/configuration' key='/configuration' sx={navStyles}>{t("configuration").toUpperCase()}</ListItem>
                    }

                </List>
                <Box width={100}>
                    <Typography variant="h6"> EBIMEX </Typography>
                </Box>
            </Toolbar>
        </AppBar>
    )
}