import React, { Component } from "react";
import { FollowingTable } from "../components/coins/FollowingTable";

class Following extends Component {
  render() {
    return (
      <div className="container">
        <h3 className="center-align">MARKET</h3>
        <FollowingTable />
      </div>
    );
  }
}
export default Following;
