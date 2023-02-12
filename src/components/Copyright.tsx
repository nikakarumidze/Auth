import { Typography, Link } from '@mui/material';

export default function Copyright(props: any) {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      {'Copyright © '}
      <Link
        color='inherit'
        target='blank'
        href='https://nika-karumidze-portfolio.surge.sh/'
      >
        Nika Karumidze
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
