import React from "react";
import { useQuery } from "@apollo/client";
import Loading from "../misc/Loading";
import { Following } from "./Following";
import { GET_COIN_DETAIL } from "../../queries/market";
import { useParams } from "react-router-dom";

export const Detail = () => {
  const params = useParams();
  const coin_id = params.coin_id;
  const coin_symbol = params.coin_symbol;
  console.log(coin_symbol);

  const { error, loading, data } = useQuery(GET_COIN_DETAIL, {
    variables: {
      id: coin_id,
    },
  });

  if (error) return <div>Somthing went wrong</div>;
  if (loading) {
    return (
      <div className="row">
        <div className="col s12 center-align">
          <Loading size="big" />
        </div>
      </div>
    );
  }

  // const diagram = (coin_id) => {
  //   return (
  //     <div
  //       style={{
  //         height: "560px",
  //         backgroundColor: "#FFFFFF",
  //         overflow: "hidden",
  //         boxSizing: "border-box",
  //         border: "1px solid #56667F",
  //         borderRadius: "4px",
  //         textAlign: "right",
  //         lineHeight: "14px",
  //         fontSize: "12px",
  //         fontFeatureSettings: "normal",
  //         textSizeAdjust: "100%",
  //         boxShadow: "inset 0 -20px 0 0 #56667F",
  //         padding: "0px",
  //         margin: "0px",
  //         width: "100%",
  //       }}
  //     >
  //       <div
  //         style={{
  //           height: "540px",
  //           padding: "0px",
  //           margin: "0px",
  //           width: "100%",
  //         }}
  //       >
  //         <iframe
  //           src="https://widget.coinlib.io/widget?type=chart&theme=light&coin_id=859&pref_coin_id=1505"
  //           width="100%"
  //           height="536px"
  //           scrolling="auto"
  //           marginWidth={0}
  //           marginHeight={0}
  //           frameBorder={0}
  //           border={0}
  //           style={{ border: 0, margin: 0, padding: 0, lineHeight: "14px" }}
  //         />
  //       </div>
  //       <div
  //         style={{
  //           color: "#FFFFFF",
  //           lineHeight: "14px",
  //           fontWeight: 400,
  //           fontSize: "11px",
  //           boxSizing: "border-box",
  //           padding: "2px 6px",
  //           width: "100%",
  //           fontFamily: "Verdana, Tahoma, Arial, sans-serif",
  //         }}
  //       >
  //         <a
  //           href="https://coinlib.io"
  //           target="_blank"
  //           style={{
  //             fontWeight: 500,
  //             color: "#FFFFFF",
  //             textDecoration: "none",
  //             fontSize: "11px",
  //           }}
  //         >
  //           Cryptocurrency Prices
  //         </a>
  //         &nbsp;by Coinlib
  //       </div>
  //     </div>
  //   );
  // };

  const diagram = () => {
    return (
      <coingecko-coin-compare-chart-widget
        coin-ids={coin_id}
        currency="usd"
        locale="en"
      ></coingecko-coin-compare-chart-widget>
    );
  };

  const ticker_widget = () => {
    return (
      <coingecko-coin-market-ticker-list-widget
        coin-id={coin_id}
        currency="usd"
        locale="en"
      ></coingecko-coin-market-ticker-list-widget>
    );
  };

  const project_news = () => {
    return (
      <coingecko-beam-widget
        type="coins"
        height="800"
        locale="en"
        project-id={coin_id}
      ></coingecko-beam-widget>
    );
  };

  return (
    <div className="row">
      <div className="col s12">{diagram()}</div>
      <div className="col s6">{ticker_widget()}</div>
      <div className="col s6">{project_news()}</div>
    </div>
  );
};
