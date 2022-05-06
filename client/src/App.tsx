import { Routing } from "./routing";
import { Provider } from "react-redux";
import { store } from "./redux";
import './config/styles/index.css';

export const App = () => {
  return (
    <Provider store={store}>
      <Routing />
    </Provider>
  );
};

export default App;
