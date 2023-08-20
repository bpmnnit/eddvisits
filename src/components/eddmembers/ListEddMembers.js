import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Visit from '../visitor/Visit';

const ListEddMembers = () => {
  const [members, setMembers] = useState([]);

  const url = 'http://localhost:3001/members';
  
  const fetchMembers = () => {
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setMembers(res);
      });
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <>
      <h2>List of the E&D Directorate Executives</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>CPF</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Deignation</TableCell>
              <TableCell>Mobile</TableCell>
              <TableCell>Extension</TableCell>
              <TableCell>Level</TableCell>
              <TableCell>Room</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {members.map((member) => (
              <TableRow
                key={member.cpf}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {member.cpf}
                </TableCell>
                <TableCell>{member.name}</TableCell>
                <TableCell>{member.designation}</TableCell>
                <TableCell>{member.mobile}</TableCell>
                <TableCell>{member.extension}</TableCell>
                <TableCell>{member.Level}</TableCell>
                <TableCell>{member.room}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Visit members={members} />
    </>
  );
};

export default ListEddMembers;