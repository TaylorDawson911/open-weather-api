import React, { useState } from 'react';
import { Button, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup, Typography, Box } from '@mui/material';

const HomeEnvironmentalRiskAssessment = () => {
  const [questions, setQuestions] = useState([
    { id: 1, question: 'Do you have a fire extinguisher in your home?', points: 5, answer: '' },
    { id: 2, question: 'Do you have working smoke detectors?', points: 5, answer: '' },
    { id: 3, question: 'Are all electrical cords and appliances in good condition?', points: 2, answer: '' },
    { id: 4, question: 'Is your home free of clutter and excess debris?', points: 2, answer: '' },
    { id: 5, question: 'Are all chemicals and cleaning products stored safely?', points: 2, answer: '' },
  ]);

  const [score, setScore] = useState(0);

  const handleAnswerChange = (event, questionId) => {
    const updatedQuestions = questions.map((question) =>
      question.id === questionId ? { ...question, answer: event.target.value } : question
    );
    setQuestions(updatedQuestions);
  };

  const handleSubmit = () => {
    const totalScore = questions.reduce((accumulator, question) => {
      const answerValue = question.answer === 'no' ? question.points : 0;
      return accumulator + answerValue;
      
    }, 0);

    setScore(totalScore);
    console.log(score)
  };

  const shouldShowProfessionalRecommendation = score >= 10;

  return (
    <>
    <Box p={5}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Home Environmental Risk Assessment
      </Typography>
      <FormGroup sx={{ mb: 3 }}>
        <FormLabel component="legend">Please answer the following questions:</FormLabel>
        {questions.map((question) => (
          <FormGroup key={question.id}>
            <Typography variant="body1">{question.question}</Typography>
            <RadioGroup
              row
              aria-label={`Question ${question.id}`}
              name={`question-${question.id}`}
              value={question.answer}
              onChange={(event) => handleAnswerChange(event, question.id)}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormGroup>
        ))}
      </FormGroup>
      <Button variant="contained" onClick={handleSubmit}>
        Submit
      </Button>
      {shouldShowProfessionalRecommendation && (
        <Typography variant="body1" sx={{ mt: 3 }}>
          Your score is {score}. We recommend that you have a professional conduct a home environmental risk assessment.
        </Typography>
      )}

</Box>
    </>
  );
};

export default HomeEnvironmentalRiskAssessment;
