import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import EntityList from '../../components/EntityList';

export default function DoctorList() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    api.get('/doctors')
      .then(res => {
        console.log('Healthcare API response:', res.data); 

        const members = res.data.member;
        if (Array.isArray(members)) {
          const rows = members.map(doc => ({
            id: doc.id,
            name: `${doc.firstName} ${doc.lastName}`, // full name
            specialty: doc.specialty
          }));
          setDoctors(rows);
        } else {
          console.error('Unexpected API structure:', res.data);
        }
      })
      .catch(err => {
        console.error('API error:', err);
      });
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'specialty', headerName: 'Specialty', width: 200 },
  ];

  return (
    <EntityList
      rows={doctors}
      columns={columns}
      newPath="/doctors/new"
    />
  );
}
