<<<<<<< Updated upstream
import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';

const User = () => {
  const auth = useSelector((state: RootState) => state.auth);

  return (
    <Grid container>
      <Grid item>zd</Grid>
      <Grid item>{auth.name}</Grid>
    </Grid>
  );
};

export default User;
=======
import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';

const User = () => {
  const auth = useSelector((state: RootState) => state.auth);

  return (
    <Grid container>
      <Grid item>zd</Grid>
      <Grid item>{auth.name}</Grid>
    </Grid>
  );
};

export default User;
>>>>>>> Stashed changes
