import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./containers/Home";
import Screener from "./containers/Screener";
import Trending from "./containers/Trending";
import Community from "./containers/Community";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import ChangePassword from "./containers/ChangePassword";

function App() {
  return (
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
          <Route path="/change_password" component={() => <ChangePassword />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
