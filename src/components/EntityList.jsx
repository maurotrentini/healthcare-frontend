import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function EntityList({ rows, columns, newPath }) {
  const navigate = useNavigate();
  return (
    <div style={{ height: 600, width: '100%' }}>
      <Button variant="contained" onClick={() => navigate(newPath)}>New</Button>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        onRowDoubleClick={(params) => 
            navigate(`${newPath.replace(/\/new$/, '')}/${params.id}/edit`)
        }
      />
    </div>
  );
}