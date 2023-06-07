import React, {
  useState,
  createContext,
  ReactNode,
  FC,
  useEffect,
} from "react";
import axios from "axios";

interface AuthContextType {
  // isLoggedIn: boolean;
  loginCall: (credentials: any) => Promise<void>;
  registerCall: (credentials: any) => Promise<void>;
  logoutUser: () => void;
  // logout: () => void;
  user: null; // Replace `User` with the actual type of `user`
  setUser: React.Dispatch<React.SetStateAction<null>>;
  message: string; // Replace `string` with the actual type of `message`
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  value: null;
  error: unknown;
}

type ContextProps = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<ContextProps> = ({ children }) => {
  const [user, setUser] = useState(null);
  // const [currentUser, setCurrentUser] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    isLoggedIn();
  }, []);

  // GET USER
  const isLoggedIn = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/user", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      setUser(res.data);
    } catch (err) {
      //
    }
  };

  // LOGOUT HANDLER
  const logoutUser = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("currentUser");
    setUser(null);
    setMessage("You have been logged out! Scram!");
  };

  // LOGIN HANDLER
  const loginCall = async (credentials: any) => {
    try {
      const res = await axios.post("http://localhost:8000/api/login", {
        headers: {
          "Content-Type": "application/json",
        },
        email: credentials.email,
        password: credentials.password,
      });

      // SET MESSAGE
      setMessage("Success!");

      // SET TOKEN
      localStorage.setItem("userToken", res.data.token);

      // SET CURRENT USER
      const userString = JSON.stringify(res.data.userFound);
      localStorage.setItem("currentUser", userString);

      window.location.reload();
    } catch (error: any) {
      setMessage(error.response.data);
    }
  };

  // REGISTER HANDLER
  const registerCall = async (credentials: any) => {
    try {
      const res = await axios.post("http://localhost:8000/api/register", {
        headers: {
          "Content-Type": "application/json",
        },
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      });

      // new user should be res.data
      if (res.status === 201) {
        const newUser = {
          email: credentials.email,
          password: credentials.password,
        };

        loginCall(newUser);
      }
    } catch (err) {
      //
    }
  };

  const authContextValue: AuthContextType = {
    // isLoggedIn: false,
    loginCall,
    registerCall,
    logoutUser,
    user,
    setUser,
    message,
    setMessage,
    value: null,
    error: Error,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
