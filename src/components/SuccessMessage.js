import * as React from "react";
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

function SuccessMessage({action}) {

    console.log("Success Message called")

    return (
      <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
        Your {action} was successful.
      </Alert>
    );
  }

export default SuccessMessage;