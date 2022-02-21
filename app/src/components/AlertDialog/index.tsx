import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface AlertProps {
    title?: string, 
    text?: string,
    open: boolean,
    handleClose?(): any,
    handleConfirm?(): any,
}

export default function AlertDialog({title, text, open, handleClose, handleConfirm}: AlertProps) {

  return (
    <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    >
    <DialogTitle id="alert-dialog-title">
        {title}
    </DialogTitle>
    <DialogContent>
        <DialogContentText id="alert-dialog-description">
            {text}
        </DialogContentText>
    </DialogContent>
    <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleConfirm} autoFocus>
        Ok
        </Button>
    </DialogActions>
    </Dialog>
  );
}
