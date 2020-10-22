import React, { useState } from "react";
// import { status } from "../forms/SignupForm";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

export const Pagintation = () => {
  const params = useParams();
  let current_page = parseInt(params.page);
  console.log(current_page);
  const history = useHistory();

  const [pages, setPaging] = useState([1, 2, 3, 4, 5]);

  if (isNaN(current_page)) current_page = 1;

  const resetPaging = (current_page) => {
    setPaging([
      current_page - 2,
      current_page - 1,
      current_page,
      current_page + 1,
      current_page + 2,
    ]);
  };

  const handleClick = (e) => {
    let target_page = parseInt(e.target.innerText);
    history.push("/" + target_page);
    resetPaging(target_page);
  };

  const handlePrevPage = () => {
    let prevPage = current_page - 1;
    if (current_page !== 1) {
      history.push("/" + prevPage);
      resetPaging(prevPage);
    }
  };
  const handleNextPage = () => {
    let nextPage = current_page + 1;
    history.push("/" + nextPage);
    resetPaging(nextPage);
  };

  const pagination = pages.map((p) => {
    return (
      <li
        className={current_page === p ? "active" : "waves-effect"}
        key={"page" + p}
      >
        <a href="#!" onClick={handleClick}>
          {p}
        </a>
      </li>
    );
  });

  return (
    <ul className="pagination">
      <li className="" onClick={handlePrevPage}>
        <a href="#!">
          <i className="material-icons">chevron_left</i>
        </a>
      </li>
      {pagination}

      <li className="" onClick={handleNextPage}>
        <a href="#!">
          <i className="material-icons">chevron_right</i>
        </a>
      </li>
    </ul>
  );
};
