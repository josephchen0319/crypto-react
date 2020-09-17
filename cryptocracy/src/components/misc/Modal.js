import React, { useEffect } from "react";
import M from "materialize-css";
import { status } from "../forms/SignupForm";

export const Modal = ({ header, status_name }) => {
  useEffect(() => {
    let elems = document.querySelectorAll(".modal");
    let options = {};
    M.Modal.init(elems, options);
    let modal = M.Modal.getInstance(elems[0]);
    modal.open();
    setTimeout(() => {
      let original_status = status();
      delete original_status[status_name];
      status(original_status);
      modal.destroy();
    }, 1000);
  });

  return (
    <div className="modal">
      <div className="modal-content">
        <h4 className="center-align no-margin">{header}</h4>
      </div>
    </div>
  );
};
