import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({setPage, totalPages}) => {
  const cambiarPagina = (e) => {
    const selectedPage = e.selected + 1;
    setPage(`&page=${selectedPage}`);
  };

  return (
    <>
      <ReactPaginate
        className="pagination"
        pageLinkClassName="page-link"
        nextLinkClassName="page-link"
        previousLinkClassName="page-link"
        breakLinkClassName="page-link"
        breakLabel="..."
        nextLabel="next >"
        previousLabel="< previous"
        onPageChange={cambiarPagina}
        pageRangeDisplayed={5}
        pageCount={totalPages}
      />
    </>
  );
};

export default Pagination;
