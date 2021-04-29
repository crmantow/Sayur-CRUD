import React from "react";
import { BrowserRouter as RouterBR, Switch, Route } from "react-router-dom";
import { Dashboard, SignIn, SignUp } from "../../pages";

const Router = () => {
  return (
    <RouterBR>
      <Switch>
        <Route exact path="/">
          <Dashboard />
        </Route>
        <Route path="/sign-up">
          <SignUp />
        </Route>
        <Route path="/sign-in">
          <SignIn />
        </Route>
      </Switch>
    </RouterBR>
  );
};

export default Router;
