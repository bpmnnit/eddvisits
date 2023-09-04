import { TextField, Button, Grid, Typography, Container, Autocomplete } from '@mui/material';
import { Formik, Form, Field } from 'formik';

import { useEffect, useState } from 'react';
import './Visit.css';
import SuccessSnackbar from '../snackbars/SuccessSnackbar';

const Visit = () => {

  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(0);
  const [selectedMemberName, setSelectedMemberName] = useState('');
  const [severity, setSeverity] = useState('info');
  const [message, setMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  
  const initialValues = {
    cpf: selectedMember,
    name: '',
    visitorname: ''
  };
  

  const getMembersUrl = 'http://localhost:3001/members';
  const addVisitUrl = 'http://localhost:3001/addvisit';
  
  const fetchMembers = () => {
    fetch(getMembersUrl)
      .then((res) => res.json())
      .then((res) => {
        setMembers(res);
      });
  };

  const getMembersNames = () => {
    const memberArray = [];
    members.forEach(member => {
      memberArray.push({ label: member.name, cpf: member.cpf, name: member.name });  
    });
    return memberArray;
  }

  const handleSubmit = async (values) => {
    const visitDetails = {
      visitor: values.visitorname,
      cpf: selectedMember,
      name: selectedMemberName,
      requestedOn: new Date(),
      status: 'PENDING',
      approvedOn: ''
    };

    fetch(addVisitUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(visitDetails),
    })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      setMessage(res.message);
      setSeverity(res.severity);
      setIsOpen(true);
    });
  };

  const callback = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" align="center" gutterBottom>
        Visitor Request Approval
      </Typography>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={getMembersNames()}
                  sx={{ width: 300 }}
                  onChange={(event, newValue) => {
                    event.preventDefault();
                    setSelectedMember(newValue.cpf);
                    setSelectedMemberName(newValue.name);
                  }}
                  isOptionEqualToValue={(option, value) =>
                    option.cpf === value.cpf
                  }
                  renderInput={(params) => <TextField {...params} label="Select EDD Member" />}
                  fullWidth
                />
              </Grid>  
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  name="visitorname"
                  label="Visitor Name"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isSubmitting}
              sx={{ marginTop: 2 }}
            >
              Submit For Approval
            </Button>
          </Form>
        )}
      </Formik>
      <SuccessSnackbar message={message} isOpen={isOpen} onClose={callback} severity={severity} />
    </Container>
  );
};

export default Visit;