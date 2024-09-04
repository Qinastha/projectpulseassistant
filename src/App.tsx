import React from "react";
import "@Qinastha/pulse_library/dist/index.css";
import { Main } from "./Main";
import { Provider } from "react-redux";
import store from "./store";
import { AuthProvider } from "./core/utilities/AuthContext";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Main />
      </AuthProvider>
    </Provider>
  );
};

export default App;
