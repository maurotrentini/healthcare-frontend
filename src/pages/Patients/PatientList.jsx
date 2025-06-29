import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import EntityList from '../../components/EntityList';

function calculateAge(dob) {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

export default function PatientList() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    api.get('/patients')
      .then(res => {
        const members = res.data.member || [];
        const rows = members.map(p => ({
          id: p.id,
          name: `${p.firstName} ${p.lastName}`,
          dob: p.dateOfBirth
            ? new Intl.DateTimeFormat('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                }).format(new Date(p.dateOfBirth))
            : 'N/A',
          age: p.dateOfBirth ? calculateAge(p.dateOfBirth) : 'N/A'
        }));
        setPatients(rows);
      })
      .catch(console.error);
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'dob', headerName: 'Date of Birth', width: 150 },
    { field: 'age', headerName: 'Age', width: 100 },
  ];

  return (
    <EntityList
      rows={patients}
      columns={columns}
      newPath="/patients/new"
    />
  );
}
