import { useState } from "react";
import { Severity } from "@/ts/interfaces/analysis";

const useSnackbar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [severity, setSeverity] = useState<Severity>(Severity.Info);
  const [message, setMessage] = useState<string>("");

  const showSnackbar = (severity: Severity, message: string) => {
    setSeverity(severity);
    setMessage(message);
    setOpen(true);
  };

  const hideSnackbar = () => {
    setOpen(false);
  };

  return {
    open,
    severity,
    message,
    showSnackbar,
    hideSnackbar,
  };
};

export default useSnackbar;
