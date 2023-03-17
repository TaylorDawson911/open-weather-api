import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,Button, TextField, Typography  } from '@mui/material';
import axios from 'axios';
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box } from '@mui/system';


function Diary() {

  const isNonMobile = useMediaQuery("(min-width:600px)");

  //  get user id from session storage
  const userData = JSON.parse(sessionStorage.getItem("UserData"));
  const userId = userData.user_id;
  
  const [diaryPosts, setDiaryPosts] = useState([]);
  const [type, setType] = useState('');
  const [message, setMessage] = useState('');

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      userId: userId,
      type: type,
      message: message,
    };
    // check if type and message are not empty
    if (type === '' || message === '') {
      alert('Please fill in all fields');
      return;
    } else {
      axios.post('http://localhost:3001/diarypost', data)
      .then(res => {
        console.log(res.data.message);
        setType('');
        setMessage('');
        // reload diary posts
        axios.get(`http://localhost:3001/getdiaryposts/${userId}`)
          .then(res => {
            setDiaryPosts(res.data.posts);
          }
        )

      })
      .catch(err => console.log(err));

    }

    
  };

  useEffect(() => {
    axios.get(`http://localhost:3001/getdiaryposts/${userId}`)
      .then(res => {
        setDiaryPosts(res.data.posts);
      })
      .catch(err => console.log(err));
  }, [userId]);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Diary
      </Typography>

    <TableContainer component={Paper}>
      <Table aria-label="diary post table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>User ID</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Message</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {diaryPosts.map((post) => (
            <TableRow key={post.id}>
              <TableCell component="th" scope="row">
                {post.id}
              </TableCell>
              <TableCell>{post.user_id}</TableCell>
              <TableCell>{post.type}</TableCell>
              <TableCell>{post.message}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    <Typography variant="h4" sx={{ mt: 2, mb: 2 }}>
        Add a new post
    </Typography>

    <form onSubmit={handleSubmit}>
    <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >

      <TextField
        id="type"
        label="Type"
        variant="filled"
        margin="normal"
        value={type}
        onChange={handleTypeChange}
      />
      <TextField
        id="message"
        label="Message"
        variant="filled"
        margin="normal"
        value={message}
        onChange={handleMessageChange}
      />
      <Button type="submit" color="secondary" variant="contained">
        Submit
      </Button>
              
    </Box>
    </form>





    </Box>


  );
}

export default Diary;
