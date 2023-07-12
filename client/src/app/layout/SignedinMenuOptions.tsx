import MenuItem from '@mui/material/MenuItem';
import { useTranslation } from 'react-i18next';
import { signOut } from '../../features/account/accountSlice';
import { useAppDispatch } from '../service/configureService';
import { toast } from 'react-toastify';


export default function SignedinMenuOptions() {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();


    return (
        <>
            <MenuItem onClick={() => {
                dispatch(signOut());
                toast.info(t('loggedOut'));
                }}>Logout</MenuItem>
        </>
    );
}