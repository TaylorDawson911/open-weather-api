import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import Post from './Post.jsx';
import Axios from 'axios';

function Forum(forum_title) {
  const { forumId } = useParams();
  const { id } = useParams();

  
  const [forum, setForum] = useState(null);
  const [forumText, setForumText] = useState(null);
  const [forumTitle, setForumTitle] = useState(null);
  const [forumIdd, setForumIdd] = useState(null);
  const [forumUser, setForumUser] = useState(null);

  useEffect(() => {
    // Fetch the forum data from the server
    Axios.get(`http://localhost:3001/getforum/${id}`)
        .then(response => {
            console.log(response);
            console.log(response.data.posts[0].post_text);
            setForumTitle(response.data.forum.forum_title);
            setForumText(response.data.posts[0].post_text);
            
        })
        .catch(error => {
            console.log(error);
        })
        
      ;
  }, [forumId]);


  return (
    <Box sx={{ p: 2 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
            {forumTitle}
        </Typography>

        <Typography variant="body1" sx={{ mb: 2 }}>
            {forumText}
        </Typography>



    </Box>
  );
}

export default Forum;