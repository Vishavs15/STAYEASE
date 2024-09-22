import { Route, Routes } from "react-router-dom";
import Index from "./components/Index";
import LogIn from "./components/LogIn";
import Layout from "./Layout";
import SignIn from "./components/SignIn";
import axios from "axios";
import { UserContextProvider } from "./components/UserContext";
import { useEffect } from "react";
import Account from "./components/Account";

// axios.defaults.baseURL = "http://localhost3000"; this one has typo error
axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

function App() {

  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Index />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/account/:subpage?" element={<Account />} />
          <Route path="/account/:subpage/:action" element={<Account />} />
          {/* <Route path="*" element={<NotFound />}  /> */}
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
