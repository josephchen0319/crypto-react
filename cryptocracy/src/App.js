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
  ApolloLink,
} from "@apollo/client";

const cache = new InMemoryCache();

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem("token");
  operation.setContext(({ headers }) => ({
    headers: {
      ...headers,
      Authorization: token ? `JWT ${token}` : ``,
    },
  }));
  return forward(operation);
});

let link = ApolloLink.from([
  authLink,
  new HttpLink({ uri: "http://127.0.0.1:8000/graphql/" }),
]);

export const client = new ApolloClient({
  link,
  cache,
});

export const checkLoggedIn = () => {
  client.writeQuery({
    query: IS_LOGGED_IN,
    data: {
      isLoggedIn: !!localStorage.getItem("token"),
    },
  });
  return client.readQuery({
    query: IS_LOGGED_IN,
  });
};

function App() {
  const verifyLoggedIn = () => {
    let { isLoggedIn } = checkLoggedIn();
    // let context = setContext((_, { headers }) => {
    //   const token = localStorage.getItem("token");
    //   // return the headers to the context so httpLink can read them
    //   return {
    //     headers: {
    //       ...headers,
    //       Authorization: token ? `JWT ${token}` : "",
    //     },
    //   };
    // });

    return !!localStorage.getItem("token") && isLoggedIn
      ? logged_in_content()
      : guest_content();
  };

  let logged_in_content = () => {
    return (
      <Switch>
        <Route
          exact
          path="/coin_detail/:coin_id"
          component={() => <CoinDetail />}
        />
        <Route exact path="/screener" render={() => <Screener />} />
        <Route path="/trending" component={() => <Trending />} />
        <Route path="/community" component={() => <Community />} />
        <Route path="/notification" component={() => <Notification />} />
        <Route path="/following" component={() => <Following />} />
        <Route path="/saved" component={() => <SavedGroup />} />
        <Route path="/:page" component={() => <Home />} />
      </Switch>
    );
  };

  let guest_content = () => {
    return (
      <Switch>
        <Route
          exact
          path="/coin_detail/:coin_id"
          component={() => <CoinDetail />}
        />
        <Route exact path="/screener" render={() => <Screener />} />
        <Route path="/trending" component={() => <Trending />} />
        <Route path="/community" component={() => <Community />} />
        <Route path="/signup" component={() => <Signup />} />
        <Route
          path="/login"
          component={() => <Login verifyLoggedIn={verifyLoggedIn} />}
        />
        <Route
          path="/:page"
          component={() => <Home verifyLoggedIn={verifyLoggedIn} />}
        />
      </Switch>
    );
  };
  let { isLoggedIn } = checkLoggedIn();
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <header>
            <Navbar />
          </header>
          {isLoggedIn ? logged_in_content() : guest_content()}
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
