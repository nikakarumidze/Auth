import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';

export default function Header() {
  return (
    <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Button size='small'>
        <Link component={RouterLink} to='/user'>
          User Page
        </Link>
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
        <Link component={RouterLink} to='/signIn'>
          Log In
        </Link>
      </Button>
    </Toolbar>
  );
}
