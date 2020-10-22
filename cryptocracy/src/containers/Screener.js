import React, { Component } from "react";
import { Category } from "../components/filters/Category";
import { NewGroup } from "../components/filters/NewGroup";
import { SearchResults } from "../components/filters/SearchResults";

class Screener extends Component {
  render() {
    return (
      <div className="row">
        <div className="col s2">
          <h4 className="center">Category</h4>
          <Category />
        </div>
        <div className="col s8 offset-s1">
          <div className="row">
            <div className="col s12">
              <NewGroup />
            </div>
          </div>
          <div className="row">
            <div className="col s12">
              <SearchResults />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Screener;
