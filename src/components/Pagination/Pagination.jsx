// import useInfiniteQuery from "react-query";
import { PaginationControl } from "react-bootstrap-pagination-control";

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

  console.log("pageNumbers", pageNumbers);

  return (
    <nav>
      {/* <ul className="pagination">
        {pageNumbers.map((pageNumber) => {
          return (
            <>
              <li key={pageNumber} className="page-item">
                <a
                  onClick={(event) => paginate(event, pageNumber)}
                  href="!#"
                  className="page-link"
                >
                  {pageNumber}
                </a>
              </li>
            </>
          );
        })}
      </ul> */}
      <PaginationControl
        page={currentPage}
        between={4}
        total={totalKirtans}
        limit={entriesPerPage}
        changePage={(currentPage) => {
          setCurrentPage(currentPage);
        }}
        ellipsis={1}
      />
    </nav>
  );
}

export default PaginationComponent;
