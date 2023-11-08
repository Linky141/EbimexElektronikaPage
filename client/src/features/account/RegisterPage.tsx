import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Paper } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import agent from '../../app/api/agent';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

export default function RegisterPage() {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const { register, handleSubmit, setError, formState: { isSubmitting, errors, isValid } } = useForm({
        mode: 'onTouched'
    });

    function handleApiErrors(errors: any) {
        if (errors) {
            errors.forEach((error: string) => {
                if (error.includes('Password')) {
                    setError('password', { message: error })
                }
                if (error.includes('Email')) {
                    setError('email', { message: error })
                }
                if (error.includes('Username')) {
                    setError('username', { message: error })
                }
            });
        }
    }

    return (
        <Container component={Paper} maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4 }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                {t('register')}
            </Typography>
            <Box component="form" onSubmit={handleSubmit(data => agent.Account.register(data)
                .then(() => {
                    toast.success("Registration succesfull - now you can login");
                    navigate('/login');
                })
                .catch(error => handleApiErrors(error)))} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    fullWidth
                    label={t('username')}
                    autoFocus
                    {...register('username', { 
                        required: t('usernameIsRequired'),  
                        pattern: {
                            value: /^([a-zA-Z0-9]){1,99}$/,
                            message: t('nameCanContainsOnlylettersAndDigits')
                        }
                    })}
                    error={!!errors.username}
                    helperText={errors.username?.message as string}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    label={t('email')}
                    {...register('email', {
                        required: t('emailIsRequired'),
                        pattern: {
                            value: /^\w+[\w-.]*@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/,
                            message: t('notValidEmailAddress')
                        }
                    })}
                    error={!!errors.email}
                    helperText={errors.email?.message as string}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    label={t('password')}
                    type="password"
                    {...register('password', {
                        required: t('passwordIsRequired'),
                        pattern: {
                            value: /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(^[a-zA-Z0-9@\$=!:.#%]+$)/,
                            message: t('notValidPassword')
                        }
                    })}
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
                    {t('registerAction')}
                </LoadingButton>
                <Grid container>
                    <Grid item>
                        <Link to='/login'>
                            {t('alreadyHaveAccountSignIn')}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}