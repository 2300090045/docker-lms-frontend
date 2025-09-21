import { createContext, useState, useContext, useEffect } from 'react';
const AuthContext = createContext();
export function AuthProvider({ children }) 
{

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem('isAdminLoggedIn') === 'true';
  });

   //const [isCustomerLoggedIn, setIsCustomerLoggedIn] = useState(() => {
//     return localStorage.getItem('isCustomerLoggedIn') === 'true';
  //});
  
   const [isFacultyLoggedIn, setIsFacultyLoggedIn] = useState(() => {
     return localStorage.getItem('isfacultyLoggedIn') === 'true';
   });
  useEffect(() => {
    localStorage.setItem('isAdminLoggedIn', isAdminLoggedIn);
    //localStorage.setItem('isCustomerLoggedIn', isCustomerLoggedIn);
    localStorage.setItem('isFacultyLoggedIn', isFacultyLoggedIn);
  }, [isAdminLoggedIn]);

  return (
    <AuthContext.Provider
      value={{
        isAdminLoggedIn,
        setIsAdminLoggedIn,
        //isStudentLoggedIn,
        //setIsStudentLoggedIn,
       isFacultyLoggedIn,
       setIsFacultyLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}


export const useAuth = () => useContext(AuthContext);