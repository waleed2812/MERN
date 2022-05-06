import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { logout } from "../redux";
import { Sample } from "../views";

export const Admin = () => {
  const dispatch = useDispatch();

  return (
    <>
      <div style={{ flexDirection: 'column' }}>
        <div>
          <button>Profile</button>
          <button>Settings</button>
          <button onClick={() => dispatch(logout())}>Logout</button>
        </div>
        <Switch>
          <Route path="/dashboard" exact component={Sample} />
          <Route path="/profile" exact component={Sample} />
          <Route path="/settings" exact component={Sample} />
        </Switch>
      </div>
    </>
  );
}

export default Admin;