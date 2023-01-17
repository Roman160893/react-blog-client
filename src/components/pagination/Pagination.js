import React from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch } from 'react-redux';

import { currentPage } from '../../redux/slices/filtersSlice';
import './PaginationStyle.scss';

const Pagination = () => {
  const dispatch = useDispatch();

  return (
    <ReactPaginate
      className="pagination"
      breakLabel="..."
      nextLabel=" >"
      onPageChange={(event) => dispatch(currentPage(event.selected + 1))}
      pageCount={4}
      previousLabel="< "
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
