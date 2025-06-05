import { BookItem } from "./BookItem/BookItem";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchItems } from "../apis/books";
import { useCreate, useDelete, useUpdate } from "../hooks/useBooksQuery";
import Box from "@mui/system/Box";
import { BooksDialog } from "./BooksDialog/BooksDialog";
import { DeleteDialog } from "./BooksDialog/DeleteBooksDialog";
import { IconButton } from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import type {
  IPagination,
  IBook,
  ICreateBookDto,
} from "../../../shared/types";

export const BooksContainer = () => {
  const [page, setPage] = useState<number>(1);
  const { isLoading, data, error } = useQuery({
    queryKey: ["fetchItems", page],
    queryFn: () => fetchItems(page),
    staleTime: 1000 * 120,
  });

  const { mutate: createMutation } = useCreate();
  const { mutate: deleteMutation } = useDelete();
  const { mutate: updateMutation } = useUpdate();

  const [selectedBook, setSelectedBook] = useState<IBook | undefined>();
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const [books, setBooks] = useState<IBook[]>([]);
  const [paginationParams, setPaginationParams] = useState<IPagination>();

  useEffect(() => {
    if (data) {
      setBooks(data.data);
      setPaginationParams(data.meta);
    }
  }, [data && JSON.stringify(data)]); // Consider replacing this with [data] for better performance

  const handleCreate = (book: ICreateBookDto) => {
    createMutation(book);
    setPage(1);
  };

  const handleEdit = (book: IBook) => {
    setSelectedBook(undefined);
    updateMutation(book);
    setPage(1);
  };

  const handleDelete = (id: string) => {
    deleteMutation({ id });
    setSelectedBook(undefined);
    setPage(1);
  };

  const openDeleteDialog = (book: IBook) => {
    setSelectedBook(book);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const openDialog = (book?: IBook) => {
    setSelectedBook(book);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const hasMorePages =
    paginationParams &&
    paginationParams.total > paginationParams.limit * paginationParams.currentPage;

  const handleSubmit = selectedBook ? handleEdit : handleCreate;

  return (
    <>
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <IconButton
          data-testid={"create-button"}
          onClick={() => {
            openDialog();
          }}
        >
          <AddCircleOutlineOutlinedIcon fontSize="large" />
        </IconButton>
      )}

      {error && <div>{error.message}</div>}

      <BooksDialog
        open={isDialogOpen}
        item={selectedBook}
        onClose={closeDialog}
        handleSubmit={handleSubmit}
        handleExit={() => {
          setSelectedBook(undefined);
        }}
        isEditMode={Boolean(selectedBook)}
      />

      {selectedBook && (
        <DeleteDialog
          open={isDeleteDialogOpen}
          item={selectedBook}
          handleCloseDialog={closeDeleteDialog}
          handleSubmit={() => {
            handleDelete(selectedBook.id);
          }}
        />
      )}

      {!isLoading && books && books.length > 0 && (
        <Box display={"flex"} flexGrow={1} flexWrap={"wrap"} gap={"24px"}>
          {books.map((book) => (
            <BookItem
              key={book.id}
              book={book}
              handleEdit={() => {
                openDialog(book);
              }}
              handleDelete={() => openDeleteDialog(book)}
            />
          ))}
        </Box>
      )}
    </>
  );
};

  