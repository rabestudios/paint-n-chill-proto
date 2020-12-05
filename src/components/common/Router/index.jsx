import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Home, Draw } from "../../routes";

const Router = () => (
  <React.Suspense fallback={<></>}>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/draw" component={Draw} />
      <Redirect to="/" />
    </Switch>
  </React.Suspense>
);

export default Router;
