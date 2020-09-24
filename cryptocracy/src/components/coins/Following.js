import React from "react";
import { useMutation } from "@apollo/client";
import { FOLLOW_COIN, UNFOLLOW_COIN } from "../../mutations/member";
import { checkLoggedIn } from "../../App";
import M from "materialize-css";
import { useDispatch, useSelector } from "react-redux";
import { GET_FOLLOWING_COINS } from "../../queries/member";
import { useQuery } from "@apollo/client";
// import { fetchRemoteData } from "../../features/following/followingSlice";

export const Following = ({ cryptoId, cryptoSymbol }) => {
  const following_coins = useSelector((state) => state.following);
  const dispatch = useDispatch();
  let { isLoggedIn } = checkLoggedIn();

  const { data, error, loading } = useQuery(GET_FOLLOWING_COINS, {
    onError: (err) => {},
  });

  // if (loading && following_coins.status !== "loading") {
  //   dispatch(
  //     fetchFollowingData({
  //       status: "loading",
  //     })
  //   );
  // }

  // if (error && following_coins.status !== "error") {
  //   dispatch(
  //     fetchFollowingData({
  //       status: "error",
  //       error: error.message,
  //     })
  //   );
  // }

  // if (data && following_coins.status !== "success") {
  //   let following = data.me.followingCoins.edges;
  //   console.log("data: " + following);
  //   dispatch(
  //     fetchFollowingData({
  //       data: following,
  //       status: "success",
  //       error: null,
  //     })
  //   );
  // }

  // const [followCoin] = useMutation(FOLLOW_COIN, {
  //   variables: {
  //     cryptoId,
  //     cryptoSymbol,
  //   },
  //   onError: (err) => {},
  // });

  // const getId = () => {
  //   if (following_coins) {
  //     for (let coin of following_coins.data) {
  //       if (coin.node.cryptoId === cryptoId) return coin.node.id;
  //     }
  //   }
  //   return false;
  // };

  // const [unfollowCoin] = useMutation(UNFOLLOW_COIN, {
  //   variables: {
  //     id: getId(),
  //   },
  //   onError: (err) => {},
  // });

  // const handleClick = (e) => {
  //   if (e.target.innerHTML === "star_border" && isLoggedIn) {
  //     e.target.innerHTML = "star";
  //     followCoin();
  //   } else {
  //     e.target.innerHTML = "star_border";
  //     unfollowCoin();
  //   }
  // };

  // const checkFollow = () => {
  //   let flag = false;
  //   if (following_coins) {
  //     for (let c of following_coins.data) {
  //       if (cryptoId === c.node.cryptoId) {
  //         flag = true;
  //       }
  //     }
  //   }
  //   return flag ? "star" : "star_border";
  // };

  // const handleToast = () => {
  //   M.toast({ html: "Login to complete the action", displayLength: 1500 });
  // };

  // const guestContent = () => {
  //   if (!isLoggedIn) {
  //     return (
  //       <a onClick={handleToast} className="black-text" href="/#">
  //         <i className="material-icons col favorite-star" onClick={handleClick}>
  //           {checkFollow()}
  //         </i>
  //       </a>
  //     );
  //   }
  //   return (
  //     <i className="material-icons col favorite-star" onClick={handleClick}>
  //       {checkFollow()}
  //     </i>
  //   );
  // };

  return (
    <h1>hello</h1>
    // guestContent()
  );
};
