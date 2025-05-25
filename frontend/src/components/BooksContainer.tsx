import { BookItem } from "./BookItem/BookItem";
import { useEffect, useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { fetchItems } from "../apis/books";
import { useCreate, useDelete, useUpdate } from "../hooks/useBooksQuery";
import Box from "@mui/system/Box";
import { BooksDialog } from "./booksDialog/BooksDialog";
import { DeleteDialog } from "./booksDialog/DeleteBooksDialog";
import { IconButton } from "@mui/material";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import type { IBook, ICreateBookDto } from "../../../shared/types";

export const BooksContainer = () => {
    const { isLoading,  data, error } = useQuery({ queryKey: ['fetchItems'], queryFn: fetchItems })
    const {mutate: createMutation} = useCreate();
    const {mutate: deleteMutation} = useDelete();
    const [selectedBook, setSelectedBook] = useState<IBook | undefined>();
    const {mutate: updateMutation} = useUpdate();
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
    const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
    const [books, setBooks] = useState<IBook[]>([]);

    useEffect(() => {
       if (data?.data) {
    setBooks(data.data);
        }}, [data && JSON.stringify(data)])


    const handleCreate = (book: ICreateBookDto) => {
        createMutation(book);
    }

      const handleEdit = (book: IBook) => {
        setSelectedBook(undefined)
         updateMutation(book);
      }

      const handleDelete = (id: string) => {
        deleteMutation({id});
        setSelectedBook(undefined)
    }
    const openDeleteDialog = (book: IBook) => {
      setSelectedBook(book)
      setDeleteDialogOpen(true)
    }

    const closeDeleteDialog = () => {
      setDeleteDialogOpen(false)
    }


const openDialog = (book?: IBook) => {
  setSelectedBook(book);
  setDialogOpen(true);
};

const closeDialog = () => {
  setDialogOpen(false);
};


  const handleSubmit = selectedBook? handleEdit: handleCreate 

  return (
    <>
    {isLoading ? <div>loading...</div>: <IconButton onClick={() => {openDialog()}}> 
      <AddCircleOutlineOutlinedIcon fontSize="large" /></IconButton> }
    {error && <div>{error.message}</div>}
    <BooksDialog
  open={isDialogOpen}
  item={selectedBook}
  onClose={closeDialog}
  handleSubmit={handleSubmit}
  handleExit={() => {
    setSelectedBook(undefined)
  }}
  isEditMode={Boolean(selectedBook)}
/>
    {selectedBook && <DeleteDialog
    open={isDeleteDialogOpen}
  item={selectedBook}
  handleCloseDialog={closeDeleteDialog}
  handleSubmit={() => {handleDelete(selectedBook.id)}}
/>}
      {!isLoading && books && books.length > 0 &&
        <Box display={"flex"} flexGrow={1} flexWrap={"wrap"} gap={"24px"}>
          {books.map(book => (
            <BookItem key={book.id} book={book} handleEdit={() => {openDialog(book)}} handleDelete={() => openDeleteDialog(book)} />
          ))}
        </Box>
}
    {books?.length === 0 && !isLoading && <div>no books</div>}
    </>
  );
};