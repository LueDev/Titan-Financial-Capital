import * as React from "react";
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

function WarningMessage({action}) {

    console.log("Warning Message called")

    return (
      <Alert icon={<CheckIcon fontSize="inherit" />} severity="warning">
        Your {action} was unsuccessful. Please enter an amount less than your balance
      </Alert>
    );
  }

export default WarningMessage;