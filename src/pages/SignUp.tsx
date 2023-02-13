import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link as RouterLink } from 'react-router-dom';
import Copyright from '../components/Copyright';
import signUpHelper from './SignUpHelper';
import LoadingButton from '@mui/lab/LoadingButton';

interface formStateObject {
  isNameValid: boolean;
  isLastNameValid: boolean;
  isEmailValid: boolean;
  isPasswordValid: boolean;
}
const baseFormValidity = {
  isNameValid: true,
  isLastNameValid: true,
  isEmailValid: true,
  isPasswordValid: true,
};
interface reqStat {
  fullfill: boolean | null;
  message?: string;
}

export default function SignUp() {
  const [formState, setFormState] = useState<formStateObject>(baseFormValidity);
  const [reqStatus, setReqStatus] = useState<reqStat>({ fullfill: null });
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signUpHelper(event, setFormState, setReqStatus, setLoading);
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5' sx={{ mb: 2 }}>
          Sign up
        </Typography>
        {reqStatus.fullfill !== null && (
          <Box
            sx={{
              border: '1px solid',
              borderColor:
                reqStatus.fullfill === false ? 'error.light' : 'success.light',
              mx: 3,
              p: 1,
            }}
          >
            <Typography
              sx={{
                color:
                  reqStatus.fullfill === false ? 'error.dark' : 'success.dark',
              }}
              align='center'
              variant='body2'
            >
              {reqStatus.message}
            </Typography>
            {reqStatus.fullfill && (
              <Link
                variant='button'
                component={RouterLink}
                to='/Login'
                sx={{ color: 'success.main', fontWeight: 'bold' }}
              >
                Go to Login Page!
              </Link>
            )}
          </Box>
        )}
        {loading && (
          <LoadingButton
            loading
            size='large'
            variant='outlined'
            sx={{ p: 2 }}
          />
        )}
        <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete='given-name'
                name='firstName'
                required
                fullWidth
                id='firstName'
                label='First Name'
                autoFocus
                error={!formState.isNameValid}
                helperText={
                  !formState.isNameValid ? 'You need to provide name' : ''
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id='lastName'
                label='Last Name'
                name='lastName'
                autoComplete='family-name'
                error={!formState.isLastNameValid}
                helperText={
                  !formState.isLastNameValid
                    ? 'You need to provide last name'
                    : ''
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                error={!formState.isEmailValid}
                helperText={
                  !formState.isEmailValid
                    ? 'You need to have a valid email.'
                    : ''
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='new-password'
                error={!formState.isPasswordValid}
                helperText={
                  !formState.isPasswordValid
                    ? 'Your password must contain at least 8 characters, minimum 1 UpperCase and 1 Number'
                    : ''
                }
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox name='checkbox' color='primary' />}
                label='I want to receive inspiration, marketing promotions and updates via email.'
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Link component={RouterLink} to='/SignIn'>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
