import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import axios from 'axios';

function Forums() {
  const [forums, setForums] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/getforums')
      .then(response => {
        setForums(response.data.forums);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      {forums.map(forum => (
        <Box
          key={forum.id}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '300px',
            height: '300px',
            border: '1px solid #000',
            borderRadius: '10px',
            padding: '10px',
            margin: '10px',
            textDecoration: 'none',
          }}
        >
          <Link to={`/forum/${forum.id}`} style={{ textDecoration: 'none' }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              {forum.forum_title}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {forum.forum_text}
            </Typography>
            <img src={forum.forum_thumbnail} alt={forum.forum_title} style={{ width: '100%' }} />
            <Typography variant="body1" sx={{ mb: 2 }}>
              Tags: {forum.forum_tags}
            </Typography>
          </Link>
        </Box>
      ))}
    </Box>
  );
}

export default Forums;