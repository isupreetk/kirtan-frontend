// import useInfiniteQuery from "react-query";
import { PaginationControl } from "react-bootstrap-pagination-control";
import "./Pagination.scss";

function PaginationComponent({
  entriesPerPage,
  totalKirtans,
  paginate,
  currentPage,
  setCurrentPage,
}) {
  const pageNumbers = [];

  for (let i = 0; i <= Math.ceil(totalKirtans / entriesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    // {/* <ul className="pagination">
    //   {pageNumbers.map((pageNumber) => {
    //     return (
    //       <>
    //         <li key={pageNumber} className="page-item">
    //           <a
    //             onClick={(event) => paginate(event, pageNumber)}
    //             href="!#"
    //             className="page-link"
    //           >
    //             {pageNumber}
    //           </a>
    //         </li>
    //       </>
    //     );
    //   })}
    // </ul> */}
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
