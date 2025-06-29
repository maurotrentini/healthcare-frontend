import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  CircularProgress,
} from "@mui/material";
import api from "../../api/api";

export default function AppointmentForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: { date: "", time: "", doctor: "", patient: "", clinic: "" },
  });

  const [loading, setLoading] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [clinics, setClinics] = useState([]);

  useEffect(() => {
    Promise.all([
      api.get("/doctors"),
      api.get("/patients"),
      api.get("/clinics"),
    ])
      .then(([dRes, pRes, cRes]) => {
        setDoctors(dRes.data.member || []);
        setPatients(pRes.data.member || []);
        setClinics(cRes.data.member || []);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!isEdit) return;
    setLoading(true);

    // Helpers to format the API values for native inputs
    const formatDateForInput = (iso) =>
      iso && iso.startsWith("20") ? iso.slice(0, 10) : "";

    const formatTimeForInput = (timeStr) => {
      if (!timeStr) return "";
      if (timeStr.includes("T")) {
        // full ISO timestamp: "1970-01-01T14:30:00+00:00"
        return timeStr.slice(
          timeStr.indexOf("T") + 1,
          timeStr.indexOf("T") + 6
        );
      }
      // plain "HH:mm:ss"
      return timeStr.slice(0, 5);
    };

    api
      .get(`/appointments/${id}`)
      .then((res) => {
        const a = res.data;
        reset({
          date: formatDateForInput(a.date),
          time: formatTimeForInput(a.time),
          doctor: a.doctor,
          patient: a.patient,
          clinic: a.clinic,
        });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id, isEdit, reset]);

  const onSubmit = (data) => {
    setLoading(true);
    const call = isEdit ? api.patch : api.post;
    const url = isEdit ? `/appointments/${id}` : "/appointments";
    const headers = isEdit
      ? { "Content-Type": "application/merge-patch+json" }
      : { "Content-Type": "application/ld+json" };

    call(url, data, { headers })
      .then(() => navigate("/appointments"))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  if (loading) {
    return (
      <Box textAlign="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 500, m: "auto", p: 3 }}>
      <Typography variant="h5" gutterBottom>
        {isEdit ? "Edit Appointment" : "Add Appointment"}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="date"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Date"
              type="date"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
          )}
        />

        <Controller
          name="time"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Time"
              type="time"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              inputProps={{ step: 300 }}
            />
          )}
        />

        {["doctor", "patient", "clinic"].map((type) => {
          const list =
            type === "doctor"
              ? doctors
              : type === "patient"
              ? patients
              : clinics;
          const label = type.charAt(0).toUpperCase() + type.slice(1);
          return (
            <Controller
              key={type}
              name={type}
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <FormControl fullWidth margin="normal">
                  <InputLabel id={`${type}-label`}>{label}</InputLabel>
                  <Select {...field} labelId={`${type}-label`} label={label}>
                    {list.map((item) => (
                      <MenuItem
                        key={item.id}
                        value={`/api/${type}s/${item.id}`}
                      >
                        {type === "clinic"
                          ? item.name
                          : `${item.firstName} ${item.lastName}`}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
          );
        })}

        <Box mt={2}>
          <Button type="submit" variant="contained" disabled={loading}>
            {isEdit ? "Update" : "Create"}
          </Button>
          <Button onClick={() => navigate("/appointments")} sx={{ ml: 2 }}>
            Cancel
          </Button>
        </Box>
      </form>
    </Box>
  );
}
