import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress
} from '@mui/material';
import api from '../../api/api';

export default function ClinicForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: { name: '', address: '' }
  });
  const [loading, setLoading] = useState(false);

  // If editing, fetch and prefill
  useEffect(() => {
    if (!isEdit) return;
    setLoading(true);
    api.get(`/clinics/${id}`)
      .then(res => {
        const { name, address } = res.data;
        reset({ name, address });
      })
      .catch(err => console.error('Failed to load clinic:', err))
      .finally(() => setLoading(false));
  }, [id, isEdit, reset]);

  const onSubmit = data => {
    setLoading(true);
    const url     = isEdit ? `/clinics/${id}` : '/clinics';
    const method  = isEdit ? api.patch : api.post;
    const headers = isEdit
      ? { 'Content-Type': 'application/merge-patch+json' }
      : { 'Content-Type': 'application/ld+json' };

    method(url, data, { headers })
      .then(() => navigate('/clinics'))
      .catch(err => console.error('Failed to save clinic:', err))
      .finally(() => setLoading(false));
  };

  if (loading) {
    return <Box textAlign="center" mt={5}><CircularProgress /></Box>;
  }

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', p: 3 }}>
      <Typography variant="h5" gutterBottom>
        {isEdit ? 'Edit Clinic' : 'Add Clinic'}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Name"
          fullWidth margin="normal"
          {...register('name', { required: true })}
        />
        <TextField
          label="Address"
          fullWidth margin="normal"
          {...register('address')}
        />
        <Box mt={2}>
          <Button type="submit" variant="contained" disabled={loading}>
            {isEdit ? 'Update' : 'Create'}
          </Button>
          <Button onClick={() => navigate('/clinics')} sx={{ ml: 2 }}>
            Cancel
          </Button>
        </Box>
      </form>
    </Box>
  );
}
