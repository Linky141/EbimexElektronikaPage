import MenuItem from '@mui/material/MenuItem';
import { useTranslation } from 'react-i18next';
import { signOut } from '../../features/account/accountSlice';
import { useAppDispatch } from '../service/configureService';
import { toast } from 'react-toastify';
import { clearServices } from '../../features/servicesPage/servicesSlice';


export default function SignedinMenuOptions() {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();


    return (
        <>
            <MenuItem onClick={() => {
                dispatch(signOut());
                dispatch(clearServices());
                toast.info(t('loggedOut'));
                }}>{t('logout')}</MenuItem>
        </>
    );
}