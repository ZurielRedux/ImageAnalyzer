// import { createContext, useContext } from "react";
// import localforage from "localforage";

// const AuthContext = createContext();

// const getUser = async () => {
//   try {
//     const user = await localforage.getItem("user");
//     if (user) {
//       return;
//     } else {
//       await localforage.setItem(user);
//     }
//   } catch (err) {
//     console.error(err);
//   }
// };

// export const useAuth = async () => {
//   try {
//     const user = await localforage.getItem("token");
//     console.log(user);

//     if (user) {
//       return true;
//     } else {
//       return false;
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };
