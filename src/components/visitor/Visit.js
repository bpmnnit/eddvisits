import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

import { useEffect, useState } from 'react';
import './Visit.css';

const Visit = (props) => {
  
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(0);
  const [visitor, setVisitor] = useState('');

  const getMembersUrl = 'http://localhost:3001/members';
  const addVisitUrl = 'http://localhost:3001/addvisit';
  
  const fetchMembers = () => {
    fetch(getMembersUrl)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setMembers(res);
      });
  };

  const getMembersNames = () => {
    const memberArray = [];
    members.forEach(member => {
      memberArray.push({ label: member.name, cpf: member.cpf });  
    });
    console.log('Members Names: ', memberArray);
    return memberArray;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const visitDetails = {
      visitor: visitor,
      cpf: selectedMember,
      requestedOn: new Date(),
      status: 'PENDING',
      approvedOn: ''
    };

    await fetch(addVisitUrl, {
      method: 'POST',
      body: JSON.stringify(visitDetails),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    .then((response) => response.json())
    .then((json) => console.log('The object written to the visits collection: ', json));
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <div className='visit'>
      <form onSubmit={handleSubmit}>
        <Card sx={{ minWidth: 600 }} style={{margin: 'auto'}}>
          <CardContent style={{ justifyContent:'center' }}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={getMembersNames()}
              sx={{ width: 300 }}
              onChange={(event, newValue) => {
                event.preventDefault();
                setSelectedMember(newValue.cpf);
              }}
              isOptionEqualToValue={(option, value) =>
                option.cpf === value.cpf
              }
              renderInput={(params) => <TextField {...params} label="Select EDD Member" />}
            />
            <TextField id="visitorname-basic" label="Visitor Name" variant="standard" onChange={e => setVisitor(e.target.value)} />
          </CardContent>
          <CardActions>
            <Button size="small" type='submit'>Submit for Approval</Button>
          </CardActions>
        </Card>
      </form>
    </div>
  );
};

export default Visit;