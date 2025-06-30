import React, { useEffect, useState } from "react";
import api from "../../api/api";
import EntityList from "../../components/EntityList";
import { CircularProgress, Box } from "@mui/material";

export default function ClinicList() {
  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/clinics")
      .then((res) => {
        const members = res.data.member;
        if (Array.isArray(members)) {
          const rows = members.map((c) => ({
            id: c.id,
            name: c.name,
            address: c.address || "",
          }));
          setClinics(rows);
        } else {
          console.error("Unexpected API structure:", res.data);
        }
      })
      .catch((err) => console.error("API error:", err))
      .finally(() => setLoading(false));
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "address", headerName: "Address", width: 300 },
  ];

  if (loading) {
    return (
      <Box textAlign="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  return <EntityList rows={clinics} columns={columns} newPath="/clinics/new" />;
}
