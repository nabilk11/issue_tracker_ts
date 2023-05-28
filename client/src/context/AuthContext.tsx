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
  const [message, setMessage] = useState("");
  // const [isLoggedIn, setIsLoggedIn] = useState(null)

  useEffect(() => {
    isLoggedIn();
  }, []);

  const isLoggedIn = async () => {
    try {
      const res = await axios.get("https://localhost:8000/api/user", {
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
  // LOGIN USER
  const loginCall = async (credentials: any) => {
    try {
      const res = await axios.post("https://localhost:8000/api/login", {
        headers: {
          "Content-Type": "application/json",
        },
        email: credentials.email,
        password: credentials.password,
      });
      console.log(res);
      console.log(res.data);
      setMessage("Success!");

      // SET TOKEN
      localStorage.setItem("userToken", res.data.token);
    } catch (error: any) {
      setMessage(error.response.data.error);
    }
  };

  const authContextValue: AuthContextType = {
    // isLoggedIn: false,
    loginCall,
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
