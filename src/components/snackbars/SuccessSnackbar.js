import { forwardRef } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SuccessSnackbar = ({message, isOpen, onClose, severity}) => {
  return (
    <Snackbar key={Math.random()} open={isOpen} autoHideDuration={3000} onClose={onClose} anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center'
    }}>
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SuccessSnackbar;