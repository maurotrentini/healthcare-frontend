import React, { useEffect, useState } from "react";
import EntityList from "../../components/EntityList";
import api from "../../api/api";
import { Button, Box, CircularProgress } from "@mui/material";

export default function AppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [pageUrl, setPageUrl] = useState("/appointments");
  const [pagination, setPagination] = useState({
    next: null,
    previous: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [appointmentsRes, doctorsRes, patientsRes, clinicsRes] =
          await Promise.all([
            api.get(pageUrl),
            api.get("/doctors"),
            api.get("/patients"),
            api.get("/clinics"),
          ]);

        // Build lookup maps keyed by the exact API IRIs:
        const doctorsMap = new Map(
          (doctorsRes.data.member || []).map((d) => [
            `/api/doctors/${d.id}`,
            `${d.firstName} ${d.lastName}`,
          ])
        );
        const patientsMap = new Map(
          (patientsRes.data.member || []).map((p) => [
            `/api/patients/${p.id}`,
            `${p.firstName} ${p.lastName}`,
          ])
        );
        const clinicsMap = new Map(
          (clinicsRes.data.member || []).map((c) => [
            `/api/clinics/${c.id}`,
            c.name,
          ])
        );

        // Extract pagination URLs
        const view = appointmentsRes.data.view || {};
        setPagination({
          next: view.next?.replace("/api", "") || null,
          previous: view.previous?.replace("/api", "") || null,
        });

        // Map appointment rows
        const rows = (appointmentsRes.data.member || []).map((appt) => ({
          id: appt.id,
          date: new Date(appt.date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }),
          time: formatTime(appt.time),
          doctor: doctorsMap.get(appt.doctor) || "Unknown",
          patient: patientsMap.get(appt.patient) || "Unknown",
          clinic: clinicsMap.get(appt.clinic) || "Unknown",
        }));

        setAppointments(rows);
      } catch (err) {
        console.error("Failed to fetch appointments or associated data", err);
      } finally {
        setLoading(false); // Stop loading on both success and error
      }
    };

    fetchData();
  }, [pageUrl]);

  // Time formatter: handles both "HH:mm:ss" and full ISO strings
  const formatTime = (timeStr) => {
    let dateObj;
    if (timeStr.includes("T")) {
      dateObj = new Date(timeStr); // full ISO
    } else {
      dateObj = new Date(`1970-01-01T${timeStr}`); // pure time
    }
    if (isNaN(dateObj)) return timeStr;
    return dateObj.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "date", headerName: "Date", width: 150 },
    { field: "time", headerName: "Time", width: 100 },
    { field: "doctor", headerName: "Doctor", width: 200 },
    { field: "patient", headerName: "Patient", width: 200 },
    { field: "clinic", headerName: "Clinic", width: 200 },
  ];

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <EntityList
        rows={appointments}
        columns={columns}
        newPath="/appointments/new"
      />

      <Box display="flex" justifyContent="center" mt={5} gap={2} pt={2}>
        <Button
          variant="outlined"
          onClick={() => setPageUrl(pagination.previous)}
          disabled={!pagination.previous}
        >
          Previous
        </Button>
        <Button
          variant="outlined"
          onClick={() => setPageUrl(pagination.next)}
          disabled={!pagination.next}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
}
