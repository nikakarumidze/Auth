import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const ErrorPage = () => {
  return (
    <Box display='flex' justifyContent='center' alignItems='center' mt={20}>
        <Typography color='primary.main' variant='h1' component='h1'>
            404: Missing Page
        </Typography>
    </Box>
  )
}
