import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import {
  TextField,
  Button,
  Box,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  CircularProgress
} from '@mui/material';
import api from '../../api/api';

export default function DoctorForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const { control, register, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
        firstName: '',
        lastName: '',
        specialty: '',
        clinic: '', // clinic IRI like "/api/clinics/3"
    }
  });
  const [loading, setLoading] = useState(false);
  const [clinics, setClinics] = useState([]);

  // 1️⃣ Load list of clinics for the dropdown
  useEffect(() => {
    api.get('/clinics')
      .then(res => {
        const members = res.data.member || [];
        setClinics(members);
      })
      .catch(console.error);
  }, []);

  // 2️⃣ If editing, load the doctor and prefill
  useEffect(() => {
    if (!isEdit) return;
    setLoading(true);

    api.get(`/doctors/${id}`)
      .then(res => {
        const { firstName, lastName, specialty, clinic } = res.data;
        // clinic is already an IRI string (e.g. "/api/clinics/3")
        reset({ firstName, lastName, specialty, clinic });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id, isEdit, setValue]);

  // 3️⃣ Submit handler
  const onSubmit = data => {
    setLoading(true);
    const url   = isEdit ? `/doctors/${id}` : '/doctors';
    const call  = isEdit
      ? api.patch
      : api.post;
    const headers = isEdit
      ? { 'Content-Type': 'application/merge-patch+json' }
      : { 'Content-Type': 'application/ld+json' };

    call(url, data, { headers })
      .then(() => navigate('/doctors'))
      .catch(err => console.error('Failed to save doctor:', err))
      .finally(() => setLoading(false));
  };

  // 4️⃣ Render form
  if (loading) {
    return <Box textAlign="center" mt={5}><CircularProgress /></Box>;
  }

  return (
    <Box sx={{ maxWidth: 500, margin: 'auto', p: 3 }}>
      <Typography variant="h5" gutterBottom>
        {isEdit ? 'Edit Doctor' : 'Add Doctor'}
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
        <TextField
          label="Specialty"
          fullWidth margin="normal"
          {...register('specialty', { required: true })}
        />

        {/* Clinic selector */}
        <Controller
            name="clinic"
            control={control}             // inject the RHF control
            defaultValue=""               // fallback value
            rules={{ required: true }}    // same validation
            render={({ field }) => (
                <FormControl fullWidth margin="normal">
                <InputLabel id="clinic-label">Clinic</InputLabel>
                <Select
                    {...field}               // includes { value, onChange, etc. }
                    labelId="clinic-label"
                    label="Clinic"
                >
                    {clinics.map(c => (
                    <MenuItem key={c.id} value={`/api/clinics/${c.id}`}>
                        {c.name}
                    </MenuItem>
                    ))}
                </Select>
                </FormControl>
            )}
        />

        <Box mt={2}>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
          >
            {isEdit ? 'Update' : 'Create'}
          </Button>
          <Button
            onClick={() => navigate('/doctors')}
            sx={{ ml: 2 }}
          >
            Cancel
          </Button>
        </Box>
      </form>
    </Box>
  );
}
