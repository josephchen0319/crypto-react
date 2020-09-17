import React from "react";
import { useQuery } from "@apollo/client";
import Loading from "../misc/Loading";
import { Following } from "./Following";
import { GET_MARKET_DATA } from "../../queries/market";
import { Link } from "react-router-dom";
import { GET_FOLLOWING_COINS } from "../../queries/member";

export const MarketTable = () => {
  const {
    error: following_error,
    loading: following_loading,
    data: following_data,
  } = useQuery(GET_FOLLOWING_COINS, {
    skip: !localStorage.getItem("token"),
  });

  let following_coins = [];

  if (following_loading) {
    // console.log(following_loading);
  }
  if (following_error) {
    console.log(following_error);
  }
  if (following_data) {
    // console.log(following_data);
    following_coins = following_data.me.followingCoins.edges;
  }

  const { loading, error, data } = useQuery(GET_MARKET_DATA, {
    variables: {
      vsCurrency: "usd",
      // order: "",
      // page: 1,
      perPage: 100,
    },
  });

  let coin_list = () => {
    if (error || !data) {
      return (
        <tr>
          <td colSpan="9">Something went wrong!</td>
        </tr>
      );
    }

    let { coinlist } = data;
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    });

    let market_data = coinlist.map((coin) => {
      let marketCapRank = coin.marketCapRank ? coin.marketCapRank : "N/A";
      let priceChangePercentage1hInCurrency = coin.priceChangePercentage1hInCurrency
        ? coin.priceChangePercentage1hInCurrency.toFixed(2) + "%"
        : "N/A";
      let priceChangePercentage7dInCurrency = coin.priceChangePercentage7dInCurrency
        ? coin.priceChangePercentage7dInCurrency.toFixed(2) + "%"
        : "N/A";
      let high24h = coin.high24h ? formatter.format(coin.high24h) : "N/A";
      let low24h = coin.low24h ? formatter.format(coin.low24h) : "N/A";
      let marketCap = coin.marketCap ? formatter.format(coin.marketCap) : "N/A";
      let currentPrice = coin.currentPrice
        ? formatter.format(coin.currentPrice)
        : "N/A";

      return (
        <tr key={coin.id}>
          <td>
            <Following
              cryptoId={coin.id}
              cryptoSymbol={coin.symbol}
              followingCoins={following_coins}
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
    return market_data;
  };

  coin_list();

  let market_table = () => {
    if (loading) {
      return (
        <div className="row">
          <div className="col s6 offset-s3 center-align">
            <Loading size="big" />
          </div>
        </div>
      );
    } else {
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

          <tbody>{coin_list()}</tbody>
        </table>
      );
    }
  };

  return market_table();
};
