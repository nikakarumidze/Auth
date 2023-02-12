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
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Copyright from '../components/Copyright';
import LogInHelper from './LogInHelper';
import LoadingButton from '@mui/lab/LoadingButton';
import { applyToken } from '../store/auth';
import { useDispatch } from 'react-redux';

interface formStateObject {
  isEmailValid: boolean;
  isPasswordValid: boolean;
}
const baseFormValidity: formStateObject = {
  isEmailValid: true,
  isPasswordValid: true,
};

export default function LogIn() {
  const [formState, setFormState] = useState<formStateObject>(baseFormValidity);
  const [reqErr, setReqErr] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    LogInHelper(
      event,
      setFormState,
      setReqErr,
      setLoading,
      dispatch,
      applyToken
    ).then((e) => e === true && navigate('/user'));
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
          Sign in
        </Typography>
        {loading && (
          <LoadingButton
            loading
            size='large'
            variant='outlined'
            sx={{ p: 2 }}
          />
        )}
        {reqErr && (
          <Box
            sx={{
              border: '1px solid',
              borderColor: 'error.light',
              mx: 3,
              mt: 2,
              p: 1,
            }}
          >
            <Typography sx={{ color: 'error.dark' }} variant='body2'>
              Invalid login or password. Remember that login names and passwords
              are case-sensitive. Please try again.
            </Typography>
          </Box>
        )}
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
            error={!formState.isEmailValid}
            helperText={
              !formState.isEmailValid ? 'You need to have a valid email.' : ''
            }
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
            error={!formState.isPasswordValid}
            helperText={
              !formState.isPasswordValid
                ? 'Your password must contain at least 8 characters, minimum 1 UpperCase and 1 Number'
                : ''
            }
          />
          <FormControlLabel
            control={<Checkbox name='checkbox' color='primary' />}
            label='Remember me'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href='#' variant='body2'>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link component={RouterLink} to='/SignUp'>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
