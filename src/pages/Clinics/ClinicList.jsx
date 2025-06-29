import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import EntityList from '../../components/EntityList';

export default function ClinicList() {
  const [clinics, setClinics] = useState([]);

  useEffect(() => {
    api.get('/clinics')
      .then(res => {
        console.log('Clinics API response:', res.data);
        const members = res.data.member;
        if (Array.isArray(members)) {
          const rows = members.map(c => ({
            id: c.id,
            name: c.name,
            address: c.address || ''
          }));
          setClinics(rows);
        } else {
          console.error('Unexpected API structure:', res.data);
        }
      })
      .catch(err => console.error('API error:', err));
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'address', headerName: 'Address', width: 300 },
  ];

  return (
    <EntityList
      rows={clinics}
      columns={columns}
      newPath="/clinics/new"
    />
  );
}
