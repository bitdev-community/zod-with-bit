import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  LetsTalkSchemaType,
  LetsTalkSchema,
} from '@learnbit/zod-examples.lets-talk-schema';

const possibleTimes = [
  '2024-12-30 10:00 AM',
  '2024-12-30 02:00 PM',
  '2024-12-31 11:00 AM',
  '2024-12-31 03:00 PM',
  '2025-01-02 09:30 AM',
];

const LetsTalkForm: React.FC = () => {
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LetsTalkSchemaType>({
    resolver: zodResolver(LetsTalkSchema),
  });

  const onSubmit = async (data: LetsTalkSchemaType) => {
    try {
      setSubmitStatus('loading');
      const response = await fetch('http://localhost:4000/lets-talk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Form submission failed.');
      }

      setSubmitStatus('success');
      reset(); // Reset the form on success
    } catch (err: unknown) {
      console.error(err);
      setSubmitStatus('error');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ mt: 2 }}
    >
      {submitStatus === 'success' && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Your request has been submitted successfully!
        </Alert>
      )}
      {submitStatus === 'error' && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Oops! Something went wrong. Please try again.
        </Alert>
      )}

      <TextField
        label="Name"
        variant="outlined"
        fullWidth
        margin="normal"
        error={!!errors.name}
        helperText={errors.name?.message}
        {...register('name')}
      />

      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        error={!!errors.email}
        helperText={errors.email?.message}
        {...register('email')}
      />

      <TextField
        label="Why we should talk"
        variant="outlined"
        fullWidth
        margin="normal"
        multiline
        rows={3}
        error={!!errors.whyWeShouldTalk}
        helperText={errors.whyWeShouldTalk?.message}
        {...register('whyWeShouldTalk')}
      />

      <FormControl fullWidth margin="normal">
        <InputLabel id="suggestTime-label">Suggest a Time</InputLabel>
        <Select
          labelId="suggestTime-label"
          label="Suggest a Time"
          error={!!errors.suggestTime}
          {...register('suggestTime')}
          defaultValue=""
        >
          <MenuItem value="" disabled>
            -- Select a time --
          </MenuItem>
          {possibleTimes.map((time) => (
            <MenuItem key={time} value={time}>
              {time}
            </MenuItem>
          ))}
        </Select>
        {errors.suggestTime && (
          <Typography variant="caption" color="error">
            {errors.suggestTime.message}
          </Typography>
        )}
      </FormControl>

      <Box sx={{ mt: 2 }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={submitStatus === 'loading'}
          startIcon={
            submitStatus === 'loading' ? <CircularProgress size="1rem" /> : null
          }
        >
          {submitStatus === 'loading' ? 'Submitting...' : 'Submit'}
        </Button>
      </Box>
    </Box>
  );
};

export default LetsTalkForm;
