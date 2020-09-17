import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/navs/Navbar";
import Home from "./containers/Home";
import CoinDetail from "./containers/CoinDetail";
import Screener from "./containers/Screener";
import Trending from "./containers/Trending";
import Community from "./containers/Community";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
// import ChangePassword from "./containers/ChangePassword";
import Notification from "./containers/Notification";
import Following from "./containers/Following";
import SavedGroup from "./containers/SavedGroup";
import { setContext } from "@apollo/client/link/context";
import { IS_LOGGED_IN } from "./queries/current_state";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";

const cache = new InMemoryCache();
const client = new ApolloClient({
  link: new HttpLink({
    headers: {
      Authorization: localStorage.getItem("token")
        ? `JWT ${localStorage.getItem("token")}`
        : "",
    },
    uri: "http://127.0.0.1:8000/graphql/",
  }),
  cache,
});

export const verifyLoggedIn = () => {
  client.writeQuery({
    query: IS_LOGGED_IN,
    data: {
      isLoggedIn: !!localStorage.getItem("token"),
    },
  });
  setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem("token");
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        Authorization: token ? `JWT ${token}` : "",
      },
    };
  });
};

export const checkLoggedIn = () => {
  return client.readQuery({
    query: IS_LOGGED_IN,
  });
};

function App() {
  let logged_in_content = () => {
    return (
      <Switch>
        <Route exact path="/" component={() => <Home />} />
        <Route
          exact
          path="/coin_detail/:coin_id/:coin_symbol"
          component={() => <CoinDetail />}
        />
        <Route exact path="/screener" component={() => <Screener />} />
        <Route path="/trending" component={() => <Trending />} />
        <Route path="/community" component={() => <Community />} />
        <Route path="/notification" component={() => <Notification />} />
        <Route path="/following" component={() => <Following />} />
        <Route path="/saved" component={() => <SavedGroup />} />
      </Switch>
    );
  };

  let guest_content = () => {
    return (
      <Switch>
        <Route exact path="/" component={() => <Home />} />
        <Route
          exact
          path="/coin_detail/:coin_id/:coin_symbol"
          component={() => <CoinDetail />}
        />
        <Route exact path="/screener" component={() => <Screener />} />
        <Route path="/trending" component={() => <Trending />} />
        <Route path="/community" component={() => <Community />} />
        <Route path="/signup" component={() => <Signup />} />
        <Route path="/login" component={() => <Login />} />
      </Switch>
    );
  };

  verifyLoggedIn();
  const { isLoggedIn } = checkLoggedIn;

  const displayContent = isLoggedIn ? logged_in_content() : guest_content();

  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <header>
            <Navbar />
          </header>
          {displayContent}
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
