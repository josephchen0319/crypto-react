import React, { useEffect } from "react";
import M from "materialize-css";

const SearchForm = ({ classes }) => {
  const handleEnter = (event) => {
    if (event.key === "Enter") {
      let input = event.target.value;
      // Search for particular coin
      console.log(input);
    }
  };

  useEffect(() => {
    let elems = document.querySelectorAll(".search-input");
    // let reader = new FileReader();
    // reader.readAsText();
    const json_data = require("../../data/search_autocomplete.json");
    let options = {
      data: json_data,
    };
    M.Autocomplete.init(elems, options);
  });

  return (
    <form className="search-form">
      <div className="input-field row valign-wrapper">
        <i className="material-icons col l1">search</i>
        <input
          type="search"
          className={classes + " col l10 search-input"}
          onKeyDown={handleEnter}
          required
        />
        <i className="material-icons inherit-line-height col l1">close</i>
      </div>
    </form>
  );
};

export default SearchForm;
