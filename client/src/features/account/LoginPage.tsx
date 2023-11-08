import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Paper } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch } from '../../app/service/configureService';
import { fetchCurrentUser, signInUser } from './accountSlice';
import { useTranslation } from 'react-i18next';
import { fetchServicesAsync } from '../servicesPage/servicesSlice';

export default function LoginPage() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { register, handleSubmit, formState: { isSubmitting, errors, isValid } } = useForm({
        mode: 'onTouched'
    });

    async function submitForm(data: FieldValues) {
        try {
            await dispatch(signInUser(data));
            navigate('/services');
        } catch (error) {
            console.log(error);
        } finally {
            await dispatch(fetchCurrentUser());
            await dispatch(fetchServicesAsync());
        }
    }

    return (
        <Container component={Paper} maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4 }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                {t('login')}
            </Typography>
            <Box component="form" onSubmit={handleSubmit(submitForm)} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    fullWidth
                    label={t('username')}
                    autoFocus
                    {...register('username', { required: t('usernameIsRequired') })}
                    error={!!errors.username}
                    helperText={errors.username?.message as string}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    label={t('password')}
                    type="password"
                    {...register('password', { required: t('passwordIsRequired') })}
                    error={!!errors.password}
                    helperText={errors.password?.message as string}
                />
                <LoadingButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={!isValid}
                    loading={isSubmitting}
                >
                    {t('loginAction')}
                </LoadingButton>
                <Grid container>
                    <Grid item>
                        <Link to='/register'>
                            {t('dontHaveAccountSignUp')}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}