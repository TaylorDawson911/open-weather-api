import { Typography, Box } from '@mui/material';

function Post({ post }) {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        {post.post_text}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        Posted by user {post.user_id}
      </Typography>
    </Box>
  );
}

export default Post;