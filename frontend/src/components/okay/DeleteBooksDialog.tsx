import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import type { IBook } from "../../../../shared/types";
type Props = {
    handleCloseDialog(): void;
    handleSubmit(id: string): void;
    open: boolean;
    item: IBook;
}
export const DeleteDialog = (props: Props) => {
    return (
<Dialog
open={props.open}
onClose={() => props.handleCloseDialog()}
aria-labelledby="alert-dialog-title"
aria-describedby="alert-dialog-description"
>
<DialogTitle id="alert-dialog-title">
  {"Delete task"}
</DialogTitle>
<DialogContent>
  <DialogContentText id="alert-dialog-description">
   Should the book "{props.item.name}" be deleted?
  </DialogContentText>
</DialogContent>
<DialogActions>
  <Button onClick={() => props.handleCloseDialog()}>Disagree</Button>
  <Button onClick={() => props.handleSubmit(props.item.id)} autoFocus>
    Agree
  </Button>
</DialogActions>
</Dialog>)}