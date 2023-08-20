import { useState } from 'react';
import cryptService from '../../services/crypt.service';
import { TextField, Button, Grid, Typography, Container } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import SuccessSnackbar from '../snackbars/SuccessSnackbar';

const SignupForm = () => {
  const [message, setMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const initialValues = {
    cpf: '',
    name: '',
    designation: '',
    password: '',
  };

  const signupUrl = 'http://localhost:3001/signup';

  const handleSubmit = async (values) => {
    const { password, ...rest } = values;
    const formData = {...rest, password: cryptService.encrypt(values.password)};
    fetch(signupUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      setMessage('User registered successfully!');
      setIsOpen(true);
    });
  };

  const callback = () => {
    setIsOpen(false);
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" align="center" gutterBottom>
        Sign Up
      </Typography>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4} md={4} lg={4}>
                <Field
                  as={TextField}
                  name="cpf"
                  label="CPF"
                  variant="outlined"
                  type="number"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={8} md={8} lg={8}>
                <Field
                  as={TextField}
                  name="name"
                  label="Name"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  name="designation"
                  label="Designation"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  type="password"
                  name="password"
                  label="Password"
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
              Sign Up
            </Button>
          </Form>
        )}
      </Formik>
      <SuccessSnackbar message={message} isOpen={isOpen} onClose={callback} />
    </Container>
  );
};

export default SignupForm;
