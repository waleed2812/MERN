import { Switch, Route } from "react-router-dom";
import { Sample } from "../views";

export default function Admin() {
  return (
    <>
      <div>
        <Switch>
          <Route path="/profile" exact component={Sample} />
        </Switch>
        <FooterAdmin />
      </div>
    </>
  );
}
