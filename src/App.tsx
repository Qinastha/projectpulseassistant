import React from "react";
import { Main } from "./Main";
import { LoginPopup } from "./Components/LoginPopup";

const App: React.FC = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  return <>{isAuthenticated ? <Main /> : <LoginPopup />}</>;
};

export default App;
