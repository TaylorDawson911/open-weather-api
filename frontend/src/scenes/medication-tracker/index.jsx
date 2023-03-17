import { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

function MedicationTracker() {
  const [medication, setMedication] = useState('');
  const [dosage, setDosage] = useState('');
  const [timesPerDay, setTimesPerDay] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Medication: ${medication}, Dosage: ${dosage}, Times per Day: ${timesPerDay}`);
    setMedication('');
    setDosage('');
    setTimesPerDay('');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Medication Tracker
      </Typography>
      <form onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField label="Medication" value={medication} onChange={(e) => setMedication(e.target.value)} />
        <TextField label="Dosage" value={dosage} onChange={(e) => setDosage(e.target.value)} />
        <TextField label="Times per Day" value={timesPerDay} onChange={(e) => setTimesPerDay(e.target.value)} />
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </Box>
  );
}

export default MedicationTracker;