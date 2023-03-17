import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

function ForumLink({ id, title }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        border: '1px solid #000',
        borderRadius: '10px',
        padding: '10px',
        margin: '10px',
        textDecoration: 'none',
      }}
    >
      <Link to={`/forum/${id}`} style={{ textDecoration: 'none' }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          {title}
        </Typography>
      </Link>
    </Box>
  );
}

export default ForumLink;
