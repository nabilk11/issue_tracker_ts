import React, { useState, createContext, ReactNode, FC } from 'react';
import axios from 'axios';

interface AuthContextType {
  // isLoggedIn: boolean;
  loginCall: (credentials: any) => Promise<void>;
  // logout: () => void;
  user: null; // Replace `User` with the actual type of `user`
  setUser: React.Dispatch<React.SetStateAction<null>>;
  message: string; // Replace `string` with the actual type of `message`
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  value: 
}

type ContextProps = {
    children: ReactNode;
  };


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<ContextProps> = ({ children }) => {
    const [user, setUser] = useState(null)
    const [message, setMessage] = useState('')
    // const [isLoggedIn, setIsLoggedIn] = useState(null)

    const isLoggedIn = async () => {
        try {
            const res = await axios.get("https://localhost:8000/api/user", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`
                }
              
            })
            setUser(res.data);
            } catch (err) {
                
            }

    }
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
            console.log(res)
            console.log(res.data)
            setMessage("Success!")

            // SET TOKEN
            localStorage.setItem("userToken", res.data.token)

            
        } catch (err: object) {
            setMessage(err.response.data.error);
            
        }
    }
    return (
        <AuthContext.Provider value={{  loginCall, user, setUser, message, setMessage }}>

            {children}
        </AuthContext.Provider>
    )
}



export default AuthContext




{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6IiQyYiQxMCRjSm5iLnNpQU1CT080bHRqZ0gvYWpPeFQ2NktJZlg2NTREQS5ZYWcvN2c0alZ1azVCd0hOMiIsImVtYWlsIjoiamFlMTIzQHRlc3QuY29tIiwiaXNzdWVzIjpbXSwicHJvamVjdHMiOltdLCJpYXQiOjE2ODUxNzQ1MjYsImV4cCI6MTY4NTE3ODEyNn0.TfS-kOcnQ19VGCdF0YCw_No0L2KZ0caS0tcJ_eDn1DY",
  "userFound": {
      "_id": "647188a7b9724fbc2ff618f6",
      "name": "Jae Song2",
      "email": "jae123@test.com",
      "password": "$2b$10$cJnb.siAMBOO4ltjgH/ajOxT66KIfX654DA.Yag/7g4jVuk5BwHN2",
      "isAdmin": false,
      "projects": [],
      "issues": [],
      "createdAt": "2023-05-27T04:35:51.952Z",
      "updatedAt": "2023-05-27T04:35:51.952Z",
      "__v": 0
  }
}