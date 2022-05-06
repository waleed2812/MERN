import { Routing } from "./routing";
import { Provider } from "react-redux";
import { store } from "./redux";

export const App = () => {
  return (
    <Provider store={store}>
      <Routing />
    </Provider>
  );
};

export default App;
