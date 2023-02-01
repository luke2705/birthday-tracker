import {Alert, Snackbar} from '@mui/material';
import React from 'react';

const Toast = (props: any) => {
    return (
        <Snackbar
            anchorOrigin={{ vertical:'top', horizontal: 'center' }}
            autoHideDuration={2000}
            open={props.open}
            onClose={props.onClose}
            message="Birthday Added!">
            <Alert onClose={props.onClose} severity={props.severity || 'success'} sx={{ width: '100%' }}>
                {props.message}
            </Alert>
        </Snackbar>
    );
};

export default Toast;