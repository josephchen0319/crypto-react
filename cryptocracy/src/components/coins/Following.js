import React from "react";
import { useMutation } from "@apollo/client";
import { FOLLOW_COIN, UNFOLLOW_COIN } from "../../mutations/member";
import { checkLoggedIn } from "../../App";
import M from "materialize-css";
import { useDispatch, useSelector } from "react-redux";
// import { GET_FOLLOWING_COINS } from "../../queries/member";
// import { useQuery } from "@apollo/client";

// import Loading from "../misc/Loading";

export const Following = ({
  cryptoId,
  cryptoSymbol,
  followingCoins,
  isLoggedIn,
}) => {
  const following = useSelector((state) => state.following);
  const dispatch = useDispatch();

  const [followCoin] = useMutation(FOLLOW_COIN, {
    onError: (err) => {},
  });

  const [unfollowCoin] = useMutation(UNFOLLOW_COIN, {
    onError: (err) => {},
  });

  const handleToast = () => {
    M.toast({ html: "Login to complete the action", displayLength: 1500 });
  };

  const getId = () => {
    for (let f of followingCoins) {
      if (f.cryptoId === cryptoId) {
        return f.id;
      }
    }
    return false;
  };

  const checkFollow = () => {
    let flag = false;
    for (let f of followingCoins) {
      if (f.cryptoId === cryptoId) {
        flag = true;
        break;
      }
    }

    return flag ? "star" : "star_border";
  };

  const handleClick = (e) => {
    if (e.target.innerHTML === "star_border" && isLoggedIn) {
      e.target.innerHTML = "star";
      followCoin({
        variables: {
          cryptoId,
          cryptoSymbol,
        },
      });
    } else {
      e.target.innerHTML = "star_border";
      if (getId()) {
        unfollowCoin({
          variables: {
            id: getId(),
          },
        });
      }
    }
  };

  if (isLoggedIn) {
    return (
      <i className="material-icons col favorite-star" onClick={handleClick}>
        {checkFollow()}
      </i>
    );
  }
  return (
    <i className="material-icons col favorite-star" onClick={handleToast}>
      star_border
    </i>
  );
};
