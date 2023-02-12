import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import type { RootState } from '../store';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../store/auth';

export default function Header() {
  const hasToken = useSelector((state: RootState) => state.auth.hasToken);
  const dispatch = useDispatch();

  return (
    <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Button size='small'>
        {hasToken && (
          <Link component={RouterLink} to='/user'>
            User Page
          </Link>
        )}
      </Button>
      <Typography
        component='h2'
        variant='h5'
        color='inherit'
        align='center'
        noWrap
        sx={{ flex: 1 }}
      >
        Auth
      </Typography>
      <IconButton>
        <SearchIcon />
      </IconButton>
      <Button variant='outlined' size='small'>
        <Link
          component={RouterLink}
          to='/Login'
          onClick={() => hasToken && dispatch(logOut())}
        >
          {hasToken ? 'Log Out' : 'Log In'}
        </Link>
      </Button>
    </Toolbar>
  );
}
