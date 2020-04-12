import React, { Component } from "react";
import _ from "lodash";
const Pagination = (props) => {
  const { pageSize, pageIndex } = props.pagination;
  let pageCount, pages;
  pageCount = Math.ceil(props.count / pageSize);
  if (pageCount === 1) return null;
  pages = _.range(1, pageCount + 1);

  return (
    <React.Fragment>
      <nav aria-label="...">
        <ul className="pagination">
          {pages.map((page) => {
            return (
              <li
                className={
                  page == props.pagination.pageIndex
                    ? "page-item active"
                    : "page-item "
                }
                key={page}
              >
                <a
                  className="page-link"
                  href="javascript:;"
                  onClick={() => props.onPageChange(page)}
                >
                  {page}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </React.Fragment>
  );
};

export default Pagination;
