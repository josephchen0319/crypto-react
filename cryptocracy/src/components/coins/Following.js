import React from "react";
import { useQuery, useApolloClient, useMutation } from "@apollo/client";
import { FOLLOW_COIN, UNFOLLOW_COIN } from "../../mutations/member";

export const Following = ({ cryptoId, cryptoSymbol, followingCoins }) => {
  const [followCoin, { error, loading, data }] = useMutation(FOLLOW_COIN, {
    variables: {
      cryptoId,
      cryptoSymbol,
    },
  });

  const getId = () => {
    for (let coin of followingCoins) {
      if (coin.node.cryptoId === cryptoId) return coin.node.id;
    }
    return false;
  };

  //9/18 unfollow coin
  const [
    unfollowCoin,
    { error: unfollowError, loading: unfollowLoading, data: unfollowData },
  ] = useMutation(UNFOLLOW_COIN, {
    variables: {
      id: getId(),
    },
    skip: getId(),
  });

  const handleClick = (e) => {
    if (e.target.innerHTML === "star_border") {
      e.target.innerHTML = "star";
      followCoin();
    } else {
      e.target.innerHTML = "star_border";
      unfollowCoin();
    }
  };

  const checkFollow = () => {
    let flag = false;
    for (let c of followingCoins) {
      if (cryptoId === c.node.cryptoId) {
        flag = true;
      }
    }
    return flag ? "star" : "star_border";
  };

  return (
    <i className="material-icons col favorite-star" onClick={handleClick}>
      {checkFollow()}
    </i>
  );
};
