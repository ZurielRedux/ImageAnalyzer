// import React, { createContext, useContext } from "react";
// import { useAuth } from "@/util/useAuth";
// import { Navigate, Outlet, useNavigate } from "react-router-dom";

// const AuthContext = createContext();

// export const ProtectedRoutes = () => {
//   const navigate = useNavigate();
//   const { isAuthenticated } = useAuth();
//   if (!isAuthenticated) {
//     navigate("/signin");
//   }

//   return auth.token ? <Outlet /> : <Navigate to="/signin" />;
// };
