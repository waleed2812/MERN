import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { logout } from "../redux";
import { Dashboard, Sample } from "../views";

export const Admin = () => {
  const dispatch = useDispatch();

  return (
    <>
      <div style={{ display: "flex", flexDirection: 'column' }}>
        <div>
          <button>Profile</button>
          <button>Settings</button>
          <button onClick={() => dispatch(logout())}>Logout</button>
        </div>
        <Switch>
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/profile" exact component={Sample} />
          <Route path="/settings" exact component={Sample} />
        </Switch>
      </div>
    </>
  );
}

export default Admin;