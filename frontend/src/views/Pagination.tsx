import { Box, Pagination, Stack } from "@mui/material";
import React from "react";
import { useTodosFilter } from "../context/TodosFilterContext";

interface Props {
  pages: number;
}

const TodosPagination: React.FC<Props> = ({ pages }) => {
  const { setTodosFilterAttributes } = useTodosFilter();
  const [page, setPage] = React.useState(1);
  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    setTodosFilterAttributes((prev) => ({ ...prev, page: value - 1 }));
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
      <Stack spacing={2}>
        <Pagination count={pages} page={page} onChange={handleChange} />
      </Stack>
    </Box>
  );
}

export default TodosPagination;