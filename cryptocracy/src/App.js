import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/navs/Navbar";
import Home from "./containers/Home";
import Screener from "./containers/Screener";
import Trending from "./containers/Trending";
import Community from "./containers/Community";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import ChangePassword from "./containers/ChangePassword";
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
    headers: { authorization: localStorage.getItem("token") },
    uri: "http://127.0.0.1:8000/graphql/",
  }),
  cache,
});

cache.writeQuery({
  query: IS_LOGGED_IN,
  data: {
    isLoggedIn: !!localStorage.getItem("token"),
  },
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <header>
            <Navbar />
          </header>
          <Switch>
            <Route exact path="/" component={() => <Home />} />
            <Route exact path="/screener" component={() => <Screener />} />
            <Route path="/trending" component={() => <Trending />} />
            <Route path="/community" component={() => <Community />} />
            <Route path="/signup" component={() => <Signup />} />
            <Route path="/login" component={() => <Login />} />
            <Route
              path="/change_password"
              component={() => <ChangePassword />}
            />
          </Switch>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
