import React, { useState, useEffect } from 'react';
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import axios from 'axios';

function HealthTracker() {
  const userData = JSON.parse(sessionStorage.getItem('UserData'));
  const userId = userData.user_id;

  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bloodPressure, setBloodPressure] = useState('');
  const [heartRate, setHeartRate] = useState('');
  const [healthPosts, setHealthPosts] = useState([]);

  const handleHeightChange = (event) => {
    setHeight(event.target.value);
  };

  const handleWeightChange = (event) => {
    setWeight(event.target.value);
  };

  const handleBloodPressureChange = (event) => {
    setBloodPressure(event.target.value);
  };

  const handleHeartRateChange = (event) => {
    setHeartRate(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      userId: userId,
      height: height,
      weight: weight,
      bmi: (weight / ((height / 100) ** 2)).toFixed(2),
      blood_pressure: bloodPressure,
      heart_rate: heartRate,
    };
    axios
      .post('http://localhost:3001/healthpost', data)
      .then((res) => {
        console.log(res.data.message);
        setHeight('');
        setWeight('');
        setBloodPressure('');
        setHeartRate('');
        // reload health posts
        axios
          .get(`http://localhost:3001/gethealthinfo/${userId}`)
          .then((res) => {
            setHealthPosts(res.data.posts);
          });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3001/gethealthinfo/${userId}`)
      .then((res) => {
        setHealthPosts(res.data.posts);
      })
      .catch((err) => console.log(err));
  }, [userId]);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4">Health Tracker</Typography>
<form onSubmit={handleSubmit}>
<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
<TextField
         label="Height (cm)"
         variant="outlined"
         value={height}
         onChange={handleHeightChange}
       />
<TextField
         label="Weight (kg)"
         variant="outlined"
         value={weight}
         onChange={handleWeightChange}
       />
<TextField
         label="Blood Pressure"
         variant="outlined"
         value={bloodPressure}
         onChange={handleBloodPressureChange}
       />
<TextField
         label="Heart Rate"
         variant="outlined"
         value={heartRate}
         onChange={handleHeartRateChange}
       />
<Button type="submit" variant="contained" sx={{ mt: 2 }}>
Submit
</Button>
</Box>
</form>
<TableContainer component={Paper} sx={{ mt: 4 }}>
<Table>
<TableHead>
<TableRow>
<TableCell>Date</TableCell>
<TableCell>Height (cm)</TableCell>
<TableCell>Weight (kg)</TableCell>
<TableCell>BMI</TableCell>
<TableCell>Blood Pressure</TableCell>
<TableCell>Heart Rate</TableCell>
</TableRow>
</TableHead>
<TableBody>
{healthPosts.map((post) => (
<TableRow key={post.id}>
<TableCell>{new Date(post.timestamp).toLocaleDateString()}</TableCell>
<TableCell>{post.height}</TableCell>
<TableCell>{post.weight}</TableCell>
<TableCell>{post.bmi}</TableCell>
<TableCell>{post.blood_pressure}</TableCell>
<TableCell>{post.heart_rate}</TableCell>
</TableRow>
))}
</TableBody>
</Table>
</TableContainer>
</Box>
);
}

export default HealthTracker;