import { Box, Card, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import styles from "./BookItem.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import type { IBook } from "../../../../shared/types";

type items = {
  book: IBook
  handleEdit(): void 
  handleDelete(): void 
}

export const BookItem = (props: items) => {
   const { book } = props
    return (
    <Card onClick={() => props.handleEdit()} className={styles.bookCard}>
      <CardMedia
        component="img"
        sx={{ width: '100%',height: '180px', objectFit: 'cover' }}
        image={'https://fastly.picsum.photos/id/263/200/300.jpg?hmac=_3gUXUjqs7PiEu_rAuPqS0Oa4X18Og5yS-C1HQ3KvtE'}
        alt={book.name}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <CardContent>
          <Typography component="h3" variant="h6" gutterBottom>
            {book.name}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            by <span data-testid="author">{book.author}</span>
          </Typography>
        </CardContent>
              <Box display="flex" justifyContent="flex-end" gap={1} p={1}>
         <Box display="flex" justifyContent="flex-end" px={1} pb={1}>
        <IconButton
          onClick={(e) => {
            e.stopPropagation(); 
            props.handleDelete();
          }}
          size="small"
          color="error"
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>
      </Box>
      </Box>
    </Card>
  );
};