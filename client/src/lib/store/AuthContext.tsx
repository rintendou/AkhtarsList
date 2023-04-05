import { createContext, useState, ReactNode, useEffect } from "react";

type User = {
  username: string;
  _id: string;
  token: string;
};

type initialContextType = {
  auth: User;
  login: (_id: string, username: string, token: string) => void;
  logout: () => void;
};

const initialContext = {
  auth: { username: "", _id: "", token: "" },
  login: () => {},
  logout: () => {},
};

const AuthContext = createContext<initialContextType>(initialContext);

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<User>({ username: "", _id: "", token: "" });

  useEffect(() => {
    if (
      localStorage.getItem("_id") !== null &&
      localStorage.getItem("username") !== null
    ) {
      setAuth({
        username: localStorage.getItem("username")!,
        _id: localStorage!.getItem("_id")!,
        token: localStorage!.getItem("token")!,
      });
    }
  }, []);

  const login = (_id: string, username: string, token: string) => {
    setAuth({ username, _id, token });
    localStorage.setItem("_id", _id);
    localStorage.setItem("username", username);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setAuth({ username: "", _id: "", token: "" });
    localStorage.removeItem("_id");
    localStorage.removeItem("username");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
export { AuthContext };
