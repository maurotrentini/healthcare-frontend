// src/pages/patients/PatientForm.jsx
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api/api';

export default function PatientForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const { control, register, handleSubmit, reset } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      dateOfBirth: ''
    }
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isEdit) return;

    setLoading(true);
    api.get(`/patients/${id}`)
      .then(res => {
        const { firstName, lastName, dateOfBirth } = res.data;
        reset({
          firstName,
          lastName,
          dateOfBirth: dateOfBirth ? dateOfBirth.slice(0, 10) : ''
        });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id, isEdit, reset]);

  const onSubmit = data => {
    setLoading(true);
    const url = isEdit ? `/patients/${id}` : '/patients';
    const call = isEdit ? api.patch : api.post;
    const headers = isEdit
      ? { 'Content-Type': 'application/merge-patch+json' }
      : { 'Content-Type': 'application/ld+json' };

    call(url, data, { headers })
      .then(() => navigate('/patients'))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  if (loading) {
    return <Box textAlign="center" mt={5}><CircularProgress /></Box>;
  }

  return (
    <Box sx={{ maxWidth: 500, margin: 'auto', p: 3 }}>
      <Typography variant="h5" gutterBottom>
        {isEdit ? 'Edit Patient' : 'Add Patient'}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="First Name"
          fullWidth margin="normal"
          {...register('firstName', { required: true })}
        />
        <TextField
          label="Last Name"
          fullWidth margin="normal"
          {...register('lastName', { required: true })}
        />
        <Controller
          name="dateOfBirth"
          control={control}
          rules={{
            validate: value =>
              !value || new Date(value) <= new Date() || 'Date of birth cannot be in the future'
          }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              type="date"
              fullWidth
              margin="normal"
              label="Date of Birth"
              InputLabelProps={{ shrink: true }}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />

        <Box mt={2}>
          <Button type="submit" variant="contained" disabled={loading}>
            {isEdit ? 'Update' : 'Create'}
          </Button>
          <Button onClick={() => navigate('/patients')} sx={{ ml: 2 }}>
            Cancel
          </Button>
        </Box>
      </form>
    </Box>
  );
}
