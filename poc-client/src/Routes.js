import React from "react";
import { Route, Switch } from "react-router-dom";
import AppliedRoute from "./AppliedRoute";
import Home from "./components/Home";
import NotFound from "./components/PageNotFound";
import Login from "./components/Login";
import Signup from "./components/Signup";
import NewTenant from "./components/NewTenant";
import Tenants from "./components/Tenants";

import AuthenticatedRoute from "./routes/AuthenticatedRoute";
import UnauthenticatedRoute from "./routes/UnauthenticatedRoute";

export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <UnauthenticatedRoute path="/login" exact component={Login} props={childProps} />
    <UnauthenticatedRoute path="/signup" exact component={Signup} props={childProps} />
    <AuthenticatedRoute path="/tenants/new" exact component={NewTenant} props={childProps} />
    <AuthenticatedRoute path="/tenants/:id" exact component={Tenants} props={childProps} />
    
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;