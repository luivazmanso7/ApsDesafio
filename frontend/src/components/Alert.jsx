import React from "react";
import { Snackbar, Alert as MuiAlert } from "@mui/material";

export default function CustomAlert({ open, onClose, message, severity = "success" }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <MuiAlert onClose={onClose} severity={severity} variant="filled" sx={{ width: "100%" }}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
}