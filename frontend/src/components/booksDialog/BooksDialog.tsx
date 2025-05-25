import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fade, TextField } from "@mui/material";
import React, { useState, useMemo, useEffect } from "react";
import type { ICreateBookDto, IUpdateBookDto, IBook } from '../../../../shared/types';

type Props = {
    onClose(): void;
    handleSubmit(book: ICreateBookDto|IUpdateBookDto): void
    handleDelete?(): void
    handleExit?(): void
    open: boolean;
    item?: IBook;
    isEditMode?: boolean
}

const DEFAULT_YEAR = 2025

export const BooksDialog = (props: Props) => {
    const [name, setName] = useState('')
    const [author, setAuthor] = useState('')
    const [publishYear, setPublishYear] = useState<number>(DEFAULT_YEAR)
    const [isEditMode, setIsEditMode] = useState(false);

useEffect(() => {
  if (props.open) {
    const isEdit = Boolean(props.item);
    setIsEditMode(isEdit);
  }
}, [props.open, props.item]);

    const text = isEditMode? "edit": "create";
    const id = props.item?.id

    useEffect(() => {
    if (props.item) {
      setName(props.item?.name);
      setAuthor(props.item?.author);
      setPublishYear(props.item?.publishYear || DEFAULT_YEAR);
    }
  }, [JSON.stringify(props.item)]);


  const hasChanged = useMemo(() => {
    if(!props.item){
      return true;
    }

    const changedProps = 
      name !== props.item?.name ||
      author !== props.item?.author ||
      publishYear !== props.item?.publishYear

    return changedProps
  }, [name, author, publishYear, props.item]);

  const clearForm = () => {
    setName('')
    setAuthor('')
    setPublishYear(DEFAULT_YEAR)
  }
return (
<React.Fragment>
<Dialog
  slots={{ transition: Fade }}
slotProps={{
  transition: {
    onExited: () => {
      clearForm();
      props.handleExit?.();
    }
  }
}}
    transitionDuration={300}
  open={props.open}
  onClose={() => props.onClose()}>
  <DialogTitle>{isEditMode ? 'Edit the details of your book.' : 'Add a new book.'}</DialogTitle>
  <DialogContent>
    <DialogContentText>
     Please {text} your book
    </DialogContentText>
    <div className="tomato" style={{'gap': '8px', display: 'flex', flexDirection: 'column'}}>
    <TextField
      autoFocus
      required
      margin="dense"
      id="name"
      name="name"
      label="Name"
      type="text"
      value={name}
      fullWidth
      onChange={event=> {setName(event.target.value)}}
      variant="standard"
    />
        <TextField
      margin="dense"
      id="author"
      name="author"
      onChange={event=> {setAuthor(event.target.value)}}
      value={author}
      label="Author"
      type="text"
      fullWidth
      variant="standard"
    />
      <TextField
      margin="dense"
      id="publishYear"
      name="publishYear"
      onChange={event=> {setPublishYear(Number(event.target.value))}}
      value={publishYear}
      label="publish Year"
      type="number"
      fullWidth
      variant="standard"
    />
 </div>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => props.onClose()}>Cancel</Button>
    <Button disabled={!hasChanged || (!name || !author)} onClick={() => {
       props.handleSubmit({id, name, author, publishYear})
        props.onClose()
        }} >{text}</Button>
  </DialogActions>
</Dialog>
</React.Fragment>)
}