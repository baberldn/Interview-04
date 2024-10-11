import React, { useContext, useEffect, useState, createContext } from "react";

const UserContext = createContext();


const UserProvider = ({ children }) => {
  const [userState, setUserState] = useState({
    Namık: true,
    Eda: true,
    Suzan: true,
    Engin: true,
    Samet: true,
  });


  useEffect(() => {
    const interval = setInterval(() => {
      const users = Object.keys(userState);
      const randomUser = users[Math.floor(Math.random() * users.length)];
      setUserState((prevUserState) => ({
        ...prevUserState,
        [randomUser]: !prevUserState[randomUser],
      }));
    }, 2000); 

    return () => clearInterval(interval);
  }, [userState]);

  return (
    <UserContext.Provider value={{ userState, setUserState }}>
      {children}
    </UserContext.Provider>
  );
};


const UserList = () => {
  const { userState } = useContext(UserContext);

  return (
    <div className="flex flex-col items-center">
      {Object.keys(userState).map((user) => (
        <div
          key={user}
          className="flex items-center justify-between w-64 p-2 m-2 border rounded-lg shadow-md "
        >
          <span className="text-lg font-semibold">{user}</span>
          <span className="text-xl">
            {userState[user] ? "🟢" : "🔴"}
          </span>
        </div>
      ))}
    </div>
  );
};

export default function App() {
  return (
    <UserProvider>
      <div className="min-h-screen bg-red-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-6 ">Kullanıcı Durumları</h1>
          <UserList />
        </div>
      </div>
    </UserProvider>
  );
}
