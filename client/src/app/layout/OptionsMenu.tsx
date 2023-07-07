import * as React from 'react';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import { FormControlLabel, IconButton, Switch, Typography, createSvgIcon } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons/faEllipsisV';
import assetsPlFlag from './../../Assets/images/flags/PL.png';
import assetsUkFlag from './../../Assets/images/flags/UK.png';


interface Props {
    darkMode: boolean;
    handleThemeChange: () => void;
    appLanguage: boolean;
    handleLanguageChange: () => void;
    rightLinks: { title: string; path: string; }[];
}

export default function OptionsMenu(props: Props) {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLButtonElement>(null);
    const { t } = useTranslation();

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: Event | React.SyntheticEvent) => {
        if (
            anchorRef.current &&
            anchorRef.current.contains(event.target as HTMLElement)
        ) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event: React.KeyboardEvent) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current!.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <Stack direction="row" spacing={2}>
            <IconButton
                ref={anchorRef}
                id="composition-button"
                aria-controls={open ? 'composition-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                // variant='text'
                color='inherit'
            >
                <FontAwesomeIcon icon={faEllipsisV} />
            </IconButton>
            <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom-start"
                transition
                disablePortal
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === 'bottom-start' ? 'left top' : 'left bottom',
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                    autoFocusItem={open}
                                    id="composition-menu"
                                    aria-labelledby="composition-button"
                                    onKeyDown={handleListKeyDown}
                                >
                                    <MenuItem>
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            <img src={assetsUkFlag} width={50} alt='EN' />
                                            <Switch checked={props.appLanguage} onChange={props.handleLanguageChange} color="default" />
                                            <img src={assetsPlFlag} width={50} alt='PL' />
                                        </Stack>
                                    </MenuItem>
                                    <MenuItem>
                                        <FormControlLabel control={<Switch checked={props.darkMode} onChange={props.handleThemeChange} />} label={t("darkMode")} />
                                    </MenuItem>

                                    {props.rightLinks.map(({ title, path }) => (
                                        <MenuItem component={NavLink} to={path} key={path}>
                                            {title.toUpperCase()}
                                        </MenuItem>
                                    ))}

                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </Stack>
    );
}