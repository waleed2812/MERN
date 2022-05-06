import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// layouts
import { Register, Login } from "../views";

// views without layouts
import { useSelector } from "react-redux";
import Admin from "./Admin";

export const Routing = () => {
  const user_data = useSelector((state) => state.auth.user_data);

  return (
    <BrowserRouter>
      <Switch>
        {/* add Switch with layouts */}
        {/* Admin Switch */}
        <PrivateRoute path="/dashboard" exact component={Admin} />
        <PrivateRoute path="/profile" exact component={Admin} />
        <PrivateRoute path="/settings" exact component={Admin} />

        {/* Auth Switch */}
        <PublicRoute path="/login" exact component={Login} />
        <PublicRoute path="/register" exact component={Register} />

        {/* add Redirect for first page */}
        <Route path="*" exact render={() => <Redirect to="/login" />} />
      </Switch>
    </BrowserRouter>
  );

  // #######################################################################

  function PrivateRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={(props) =>
          !!user_data ? (
            React.createElement(component, props)
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          )
        }
      />
    );
  }

  function PublicRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={(props) =>
          !!user_data ? (
            <Redirect
              to={{
                pathname: "/dashboard",
              }}
            />
          ) : (
            React.createElement(component, props)
          )
        }
      />
    );
  }
};

export default Routing;
