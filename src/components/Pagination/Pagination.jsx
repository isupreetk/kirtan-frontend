import { PaginationControl } from "react-bootstrap-pagination-control";
import "./Pagination.scss";

function PaginationComponent({
  entriesPerPage,
  totalKirtans,
  currentPage,
  setCurrentPage,
}) {
  const pageNumbers = [];

  for (let i = 0; i <= Math.ceil(totalKirtans / entriesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <PaginationControl
      className="pagination"
      page={currentPage}
      between={1}
      total={totalKirtans}
      limit={entriesPerPage}
      changePage={(currentPage) => {
        setCurrentPage(currentPage);
      }}
      paginationSize={1}
      next={false}
      last={true}
      ellipsis={1}
    />
  );
}

export default PaginationComponent;
