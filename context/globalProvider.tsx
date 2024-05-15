import React, { useState, useEffect, createContext, useContext } from "react";
import { getCurrentUser } from "../lib/appwrite";
import { GlobalContextProps, GlobalProviderProps, UserProps } from "../types";

const GlobalContext = createContext<GlobalContextProps>({
  isLoading: true,
  isLoggedIn: false,
  user: null,
  setIsLoggedIn: () => {},
  setUser: () => {},
});

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          setUser(res);
          console.log("User got from server", res);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const globalContextValue = {
    isLoggedIn,
    setIsLoggedIn,
    user,
    setUser,
    isLoading,
  };

  return (
    <GlobalContext.Provider value={globalContextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
