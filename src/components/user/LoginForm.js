import cryptService from '../../services/crypt.service';
import { TextField, Button, Grid, Typography, Container } from '@mui/material';
import { Formik, Form, Field } from 'formik';

const LoginForm = () => {

  const initialValues = {
    cpf: '',
    password: ''
  };

  const loginUrl = 'http://localhost:3001/login';

  const handleSubmit = async (values) => {
    console.log('Values: ', values);
    const { password, ...rest } = values;
    const formData = {...rest, password: cryptService.encrypt(values.password)};
    fetch(loginUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(res => res.json())
    .then(res => {
      console.log(res);
    });
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" align="center" gutterBottom>
        Log In
      </Typography>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  name="cpf"
                  label="CPF"
                  variant="outlined"
                  type="number"
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
              Log In
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default LoginForm;
