import { useContext, useEffect, useState } from "react";
import { useAxios } from "./useAxios";
import { Context } from "../context/Context";
import { useNavigate } from "react-router-dom";

const useAuth = (code) => {
  const navigate = useNavigate();
  const [accessToken, setCurrentAccessToken] = useState(null);
  const { setAccessToken } = useContext(Context);

  useEffect(() => {
    useAxios()
      .post("/login", { code })
      .then((res) => {
        setCurrentAccessToken(res.data.accessToken);
        setAccessToken(res.data.accessToken);
        window.history.pushState({}, null, "/");
      })
      .catch((err) => {
        navigate("/");
      });
  }, [code]);
  return accessToken;
};

export default useAuth;
