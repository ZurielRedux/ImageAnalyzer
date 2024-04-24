import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { CustomSnackbarProps } from "@/ts/interfaces/analysis";

export const CustomSnackbar: React.FC<CustomSnackbarProps> = ({
  open,
  severity,
  message,
  onClose,
  autoHideDuration = 6000,
}) => {
  return (
    <Snackbar open={open} autoHideDuration={autoHideDuration} onClose={onClose}>
      <Alert onClose={onClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
