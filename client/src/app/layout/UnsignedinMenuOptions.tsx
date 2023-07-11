import MenuItem from '@mui/material/MenuItem';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';


export default function UnsignedinMenuOptions() {
    const { t } = useTranslation();

    const rightLinks = [
        { title: t("login"), path: '/login' },
        { title: t("register"), path: '/register' }
    ]

    return (
        <>
            {rightLinks.map(({ title, path }) => (
                <MenuItem component={NavLink} to={path} key={path}>
                    {title.toUpperCase()}
                </MenuItem>
            ))}
        </>
    );
}