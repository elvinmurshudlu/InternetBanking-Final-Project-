
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper, { PaperProps } from '@mui/material/Paper';
import { useState } from 'react';



export default function DialogModal({open,setOpen,onSubscribe,children,content}:{open:boolean,setOpen:any,onSubscribe:any,children:any,content:string}) {

  async function agree(){
    let result = await onSubscribe()
    if(result){
      setOpen(false)
    }
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
      >
        {/* <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Subscribe
        </DialogTitle> */}
        <DialogContent>
          <DialogContentText gutterBottom>
            {content}
          </DialogContentText>
            {children}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={agree}>Agree</Button>
        </DialogActions>
      </Dialog>
      
    
  );
}