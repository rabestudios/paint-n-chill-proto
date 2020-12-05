import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "redux/store";

const AppProvider = ({ children }) => (
  <Provider store={store}>
    <BrowserRouter>{children}</BrowserRouter>
  </Provider>
);

export default AppProvider;
