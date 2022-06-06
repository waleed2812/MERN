import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { logout } from "../redux";
import { Dashboard, Sample, Profile } from "../views";

export const Admin = () => {
  const dispatch = useDispatch();

  return (
    <>
      <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <a href="/dashboard">Dashboard</a>
          <a href="/profile">Profile</a>
          <a href="/settings">Settings</a>
          <button onClick={() => dispatch(logout())}>Logout</button>
        </div>
        <Switch>
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/settings" exact component={Sample} />
        </Switch>
      </div>
    </>
  );
};

export default Admin;
