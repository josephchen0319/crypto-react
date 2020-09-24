import React, { useEffect } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import Loading from "../misc/Loading";
import { Following } from "./Following";
import { GET_MARKET_DATA } from "../../queries/market";
import { Link } from "react-router-dom";
// import { checkLoggedIn } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import { fetchMarketData } from "../../features/market/marketSlice";
import { useParams } from "react-router-dom";

export const MarketTable = () => {
  const market_data = useSelector((state) => state.market);

  const dispatch = useDispatch();

  //MARKET DATA
  const params = useParams();
  let current_page = parseInt(params.page);
  if (isNaN(current_page)) current_page = 1;

  const { data, loading, error } = useQuery(GET_MARKET_DATA, {
    variables: {
      page: current_page,
    },
  });
  console.log(market_data.status);

  if (loading && market_data.status !== "loading") {
    dispatch(
      fetchMarketData({
        status: "loading",
      })
    );
  }

  if (error && market_data.status !== "error") {
    dispatch(
      fetchMarketData({
        status: "error",
        error: error.message,
      })
    );
  }

  if (data && market_data.status !== "success") {
    let { coinlist } = data;
    let unique_list = coinlist.filter((v, i) => coinlist.indexOf(v) === i);
    dispatch(
      fetchMarketData({
        data: unique_list,
        status: "success",
        error: null,
        page: current_page,
      })
    );
  }

  const display = () => {
    if (market_data.status === "loading") {
      return (
        <div className="row">
          <div className="col s6 offset-s3 center-align">
            <Loading size="big" />
          </div>
        </div>
      );
    } else if (market_data.status === "success") {
      const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
      });

      let display_data = market_data.data.map((coin) => {
        let marketCapRank = coin.marketCapRank ? coin.marketCapRank : "N/A";
        let priceChangePercentage1hInCurrency = coin.priceChangePercentage1hInCurrency
          ? coin.priceChangePercentage1hInCurrency.toFixed(2) + "%"
          : "N/A";
        let priceChangePercentage7dInCurrency = coin.priceChangePercentage7dInCurrency
          ? coin.priceChangePercentage7dInCurrency.toFixed(2) + "%"
          : "N/A";
        let high24h = coin.high24h ? formatter.format(coin.high24h) : "N/A";
        let low24h = coin.low24h ? formatter.format(coin.low24h) : "N/A";
        let marketCap = coin.marketCap
          ? formatter.format(coin.marketCap)
          : "N/A";
        let currentPrice = coin.currentPrice
          ? formatter.format(coin.currentPrice)
          : "N/A";

        return (
          <tr key={coin.id}>
            <td>
              <Following
                cryptoId={coin.id}
                cryptoSymbol={coin.symbol}
                // followingCoins={following_coins}
                // isLoggedIn={isLoggedIn}
              />
            </td>
            <td>{marketCapRank}</td>
            <td className="for-more-padding-in-table">
              <Link to={"/coin_detail/" + coin.id + "/" + coin.symbol}>
                <img
                  src={coin.image}
                  alt="coin/token"
                  className="responsive-img market-table-coin-image"
                ></img>
                <span className="black-text">
                  &nbsp;{coin.id + "(" + coin.symbol + ")"}
                </span>
              </Link>
            </td>
            <td
              className={
                coin.priceChangePercentage1hInCurrency > 0
                  ? "green-text"
                  : "red-text"
              }
            >
              {priceChangePercentage1hInCurrency}
            </td>
            <td className="green-text">{high24h}</td>
            <td className="red-text">{low24h}</td>
            <td
              className={
                coin.priceChangePercentage7dInCurrency > 0
                  ? "green-text"
                  : "red-text"
              }
            >
              {priceChangePercentage7dInCurrency}
            </td>
            <td>{marketCap}</td>
            <td>{currentPrice}</td>
          </tr>
        );
      });
      return (
        <table className="responsive-table highlight">
          <thead>
            <tr>
              <th>Favorite</th>
              <th>Rank</th>
              <th className="for-more-padding-in-table">Coin</th>
              <th>1h&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
              <th>High 24h</th>
              <th>Low 24h</th>
              <th>7d</th>
              <th>Market cap </th>
              <th>Price</th>
            </tr>
          </thead>

          <tbody>{display_data}</tbody>
        </table>
      );
    } else {
      return (
        <div className="row">
          <div className="col s6 offset-s3 center-align">
            <h3>Something went wrong!</h3>
          </div>
        </div>
      );
    }
  };

  return display();
};
