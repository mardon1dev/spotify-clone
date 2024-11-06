import React, { useContext } from "react";
import Login from "./pages/Login";
import Layout from "./layout/Layout";
import { Context } from "./context/Context";

const App = () => {
  const yourCode = new URLSearchParams(location.search).get("code");
  const { accessToken } = useContext(Context);

  return yourCode || accessToken ? <Layout code={yourCode} /> : <Login />;
};

export default App;
