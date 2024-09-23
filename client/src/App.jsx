import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./components/Index";
import LogIn from "./components/LogIn";
import Layout from "./Layout";
import SignIn from "./components/SignIn";
import Account from "./components/Account";
import PlacesPage from "./components/PlacesPage"; // Import PlacesPage
import axios from "axios";
import { UserContextProvider } from "./components/UserContext";

// Set Axios defaults
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
          {/* Account Page Route */}
          <Route path="/account/:subpage?" element={<Account />} />
          {/* Places Page Route */}
          <Route path="/account/places/:action?" element={<PlacesPage />}/>
          {/* This handles /places and /places/new */}
          {/* <Route path="*" element={<NotFound />}  /> */}
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
