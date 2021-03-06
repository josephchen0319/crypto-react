import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import Loading from "../misc/Loading";
import { Following } from "./Following";
import { GET_MARKET_DATA } from "../../queries/market";
import { Link } from "react-router-dom";
import { checkLoggedIn } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import { fetchMarketData } from "../../features/market/marketSlice";
import { useParams } from "react-router-dom";
import { GET_FOLLOWING_COINS } from "../../queries/member";
import { FOLLOW_COIN, UNFOLLOW_COIN } from "../../mutations/member";
import { fetchFollowingData } from "../../features/following/followingSlice";

export const MarketTable = () => {
  const market_data = useSelector((state) => state.market);
  const following = useSelector((state) => state.following);
  const dispatch = useDispatch();
  let { isLoggedIn } = checkLoggedIn();

  //MARKET DATA
  const params = useParams();
  let current_page = parseInt(params.page);
  if (isNaN(current_page)) current_page = 1;

  const { data, loading, error } = useQuery(GET_MARKET_DATA, {
    variables: {
      page: current_page,
    },
  });

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

  //FOLLOWING DATA
  const {
    data: following_data,
    error: following_error,
    loading: following_loading,
  } = useQuery(GET_FOLLOWING_COINS, {
    onError: (err) => {},
  });

  if (following_loading && following.status !== "loading") {
    dispatch(
      fetchFollowingData({
        status: "loading",
      })
    );
  }

  if (following_error && following.status !== "error") {
    dispatch(
      fetchFollowingData({
        status: "error",
        error: following_error.message,
      })
    );
  }

  if (following_data && following.status !== "success") {
    let following = following_data.me.followingCoins.edges;
    dispatch(
      fetchFollowingData({
        data: following,
        status: "success",
        error: null,
      })
    );
  }

  const followingComponent = (cryptoId, cryptoSymbol) => {
    let following_coins = [];
    if (following.data.length > 0) {
      following_coins = following.data;
    }
    return (
      <Following
        cryptoId={cryptoId}
        cryptoSymbol={cryptoSymbol}
        followingCoins={following_coins}
        isLoggedIn={isLoggedIn}
      />
    );
  };

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

      let display_data = market_data.data.map((coin) => {
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

        return (
          <tr key={coin.id}>
            <td>{followingComponent(coin.id, coin.symbol)}</td>
            <td>{marketCapRank}</td>
            <td className="for-more-padding-in-table">
              <Link to={"/coin_detail/" + coin.id}>
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
