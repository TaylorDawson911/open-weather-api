import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";

import Form from "./scenes/form";
import Profile from "./scenes/profile";
import MedicationTracker from "./scenes/medication-tracker";
import FAQ from "./scenes/faq";
import Forum from "./scenes/forums/Forum";
import Forums from "./scenes/forums/Forums";
import Login from "./scenes/login";
import HomeEnvironmentalRiskAssessment from "./scenes/environmental-assessment";
import Register from "./scenes/register";
import HealthTracker from "./scenes/health-tracker";
import Geography from "./scenes/geography";
import Post from "./scenes/forums/ForumLink";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { useLocation } from 'react-router-dom';
import Diary from "./scenes/diary";
import Home from "./scenes/home";
import Calendar from "./scenes/calendar/calendar";
function App() {

  
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const location = useLocation();



  
  // Determine whether to show the sidebar and top bar based on the current route
  const isSidebarVisible = !['/login', '/register', "/"].includes(location.pathname);


  return (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            {isSidebarVisible && <Sidebar />}
            <main className="content">
              {isSidebarVisible && <Topbar />}
              <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/health-tracker" element={<HealthTracker />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/environmental-assessment" element={<HomeEnvironmentalRiskAssessment />} />
                <Route path="/diary" element={<Diary />} />
                <Route path="/medication-tracker" element={<MedicationTracker />} />
                <Route path="/form" element={<Form />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/geography" element={<Geography />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route path="/forums" element={<Forums />} />
                <Route path="/forum/:id" element={<Forum />} />
                <Route path="/forums/:id/:postid" element={<Post />} />
                


              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
      
  );
}

export default App;
