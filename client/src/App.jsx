import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import LogIn from "./pages/LogIn";
import Layout from "./Layout";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import PlacesPage from "./pages/PlacesPage"; // Import PlacesPage
import axios from "axios";
import { UserContextProvider } from "./components/UserContext";
import PlacesFormPage from "./pages/PlacesFormPage";
import Dashboard from './admin/Dashboard';

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
          <Route path="/account/:subpage?" element={<Profile />} />
          <Route path="/account/places" element={<PlacesPage />}/>
          <Route path="/account/places/new" element={<PlacesFormPage />}/>
          <Route path="/account/places/:id" element={<PlacesFormPage />}/>
          <Route path="/admin" element={<Dashboard />}/>
          {/* This handles /places and /places/new */}
          {/* <Route path="*" element={<NotFound />}  /> */}
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
