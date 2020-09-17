import React, { Component } from "react";
import { MarketTable } from "../components/coins/MarketTable";
import { Pagintation } from "../components/misc/Pagintation";
class Home extends Component {
  render() {
    return (
      <div className="homepage container">
        <h3 className="center-align">MARKET</h3>
        <MarketTable />
        <div className="row">
          <div className="col s6 offset-s3 center-align">
            <Pagintation />
          </div>
        </div>
      </div>
    );
  }
}
export default Home;
