import React from "react";
import Loading from "../misc/Loading";
import { Following } from "../coins/Following";

import { checkLoggedIn } from "../../App";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const SearchResults = () => {
  // const dispatch = useDispatch();
  const searchResult = useSelector((state) => state.searchResult.data);
  const searchStatus = useSelector((state) => state.searchResult.status);
  const following = useSelector((state) => state.following);
  // const searchResultFilterDetails = useSelector(
  //   (state) => state.searchResult.filterDetails
  // );
  let isLoggedIn = checkLoggedIn();

  if (searchStatus === "loading") {
    return (
      <div className="row">
        <div className="col s6 offset-s3 center-align">
          <Loading size="big" />
        </div>
      </div>
    );
  }

  if (searchResult.length !== 0) {
    const currentPriceformatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 5,
    });
    const marketCapformatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    });

    let display_data = searchResult.map((coin) => {
      let marketCapRank = coin.marketCapRank ? coin.marketCapRank : "N/A";
      let priceChangePercentage1hInCurrency = coin.priceChangePercentage1hInCurrency
        ? coin.priceChangePercentage1hInCurrency.toFixed(2) + "%"
        : "N/A";
      let priceChangePercentage7dInCurrency = coin.priceChangePercentage7dInCurrency
        ? coin.priceChangePercentage7dInCurrency.toFixed(2) + "%"
        : "N/A";
      let high24h = coin.high24h
        ? currentPriceformatter.format(coin.high24h)
        : "N/A";
      let low24h = coin.low24h
        ? currentPriceformatter.format(coin.low24h)
        : "N/A";
      let marketCap = coin.marketCap
        ? marketCapformatter.format(coin.marketCap)
        : "N/A";
      let currentPrice = coin.currentPrice
        ? currentPriceformatter.format(coin.currentPrice)
        : "N/A";
      let following_coins = [];
      if (following.data.length > 0) {
        following_coins = following.data;
      }

      return (
        <tr key={coin.id}>
          <td>
            <Following
              cryptoId={coin.id}
              cryptoSymbol={coin.symbol}
              followingCoins={following_coins}
              isLoggedIn={isLoggedIn}
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
      <React.Fragment>
        <h3 className="center">Results</h3>
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
      </React.Fragment>
    );
  }

  if (searchStatus === "error") {
    return <h3 className="center">Something went wrong</h3>;
  }
  return <div></div>;
};
