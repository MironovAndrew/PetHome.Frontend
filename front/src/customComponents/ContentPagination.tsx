import { Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { useState } from "react";

export function ContentPagination({
  onSave,
}: {
  onSave: (pageNum: number) => void;
}) {
  const [pageNum, setPageNum] = useState(1);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPageNum(value);
    onSave(value);
  };

  return (
    <>
      <Typography>Страница: {pageNum}</Typography>
      <Pagination
        count={10}
        page={pageNum}
        defaultPage={1}
        boundaryCount={2}
        onChange={handlePageChange}
      />
    </>
  );
}
