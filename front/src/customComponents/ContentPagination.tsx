import { Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { useState } from "react";

export function ContentPagination(
  contentCount: number,
  pageContentCount: number
) {
  const [pageNum, setPageNum] = useState(1);
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPageNum(value);
  };

  const pageCount = contentCount / pageContentCount;

  return (
    <>
      <Typography>Страница: {pageNum}</Typography>
      <Pagination
        count={pageCount}
        page={pageNum}
        defaultPage={1}
        boundaryCount={2}
        onChange={handlePageChange}
      />
    </>
  );
}
