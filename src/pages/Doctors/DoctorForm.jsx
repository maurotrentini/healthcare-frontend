import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import api from '../../api/api';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Box } from '@mui/material';

export default function DoctorForm() {
  const { register, handleSubmit, reset } = useForm();
  const { id } = useParams();
  const navigate = useNavigate();

  const onSubmit = data => {
    const payload = {
      ...data,
    };
    const request = id
      ? api.put(`/doctors/${id}`, payload)
      : api.post('/doctors', payload);

    request.then(() => navigate('/doctors'));
  };

  useEffect(() => {
    if (id) {
      api.get(`/doctors/${id}`).then(res => {
        reset({
          name: res.data.name,
          specialty: res.data.specialty,
        });
      });
    }
  }, [id, reset]);

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 2 }}>
      <TextField
        label="Name"
        fullWidth
        margin="normal"
        {...register('name', { required: true })}
      />
      <TextField
        label="Specialty"
        fullWidth
        margin="normal"
        {...register('specialty', { required: true })}
      />
      <Button variant="contained" type="submit">
        {id ? 'Update' : 'Create'}
      </Button>
    </Box>
  );
}
