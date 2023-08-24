import { createContext, useContext, useState } from 'react';

// Create a context
const UserContext = createContext();

// Create a provider component
export function UserProvider({ children }) {
  const [userRole, setUserRole] = useState(null);
  const[userId , setUserId] = useState(null);

  // Function to set the user role
  const setUser = (role) => {
    setUserRole(role);
  };

  return (
    <UserContext.Provider value={{ userRole, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

// Create a custom hook for using the user context
export function useUser() {
  return useContext(UserContext);
}
