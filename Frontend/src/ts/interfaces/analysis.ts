//
export enum Severity {
  Success = "success",
  Error = "error",
  Warning = "warning",
  Info = "info",
}

export interface CustomSnackbarProps {
  open: boolean;
  severity: "error" | "success" | "info" | "warning";
  message: string;
  onClose: () => void;
  autoHideDuration?: number;
}
