import "./App.css";
import { Routes, Route } from "react-router-dom";
import Group from "./components/Group/Group";
import PullName from "./components/pullName/PullName";
import Home from "./components/Home/Home";
import Account from "./components/Account/Account";
import GiftIdeas from "./components/GiftIdeas/GiftIdeas";
import NavBar from "./components/Home/NavBar";
import { useState } from "react";
import { useEffect } from "react";
import Info from "./components/Info/Info";
import Footer from "./components/Footer";
import GroupJoin from "./components/Group/GroupJoin";
import GroupDetails from "./components/Group/GroupDetails";
import NotFound from "./components/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import { SvgIcon } from "@mui/material";
import BrightnessMediumIcon from "@mui/icons-material/BrightnessMedium";
import RequireAuth from "./components/authentication/RequireAuth";
import AuthLanding from "./components/authentication/AuthLanding";

function App() {
  let defaultTheme;
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    defaultTheme = "dark";
  } else {
    defaultTheme = "light";
  }
  const [theme, setTheme] = useState(defaultTheme);

  function toggleTheme() {
    if (theme.includes("light")) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);
  return (
    <>
      <ScrollToTop />
      <div className="d-flex flex-column min-vh-100">
        <div className="p-2">
          
          <NavBar />
          
          <Routes>
            <Route index element={<Home />} />
            <Route
              path="group"
              element={
                <RequireAuth>
                  <Group />
                </RequireAuth>
              }
            />
            <Route
              path="groupjoin"
              element={
                <RequireAuth>
                  <GroupJoin />
                </RequireAuth>
              }
            />
            <Route
              path="group/:code/details"
              element={
                <RequireAuth>
                  <GroupDetails />
                </RequireAuth>
              }
            />
            <Route
              path="group/:code/pullname"
              element={
                <RequireAuth>
                  <PullName />
                </RequireAuth>
              }
            />
            <Route path="login" element={<AuthLanding />} />
            <Route
              path="account"
              element={
                <RequireAuth>
                  <Account />
                </RequireAuth>
              }
            />
            <Route
              path="group/:code/gift/:userId"
              element={
                <RequireAuth>
                  <GiftIdeas />
                </RequireAuth>
              }
            />
            <Route path="info" element={<Info />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <button
            className="title position-fixed position-absolute top-0 end-0 border-0 themeIcon"
            onClick={toggleTheme}
            aria-hidden="true"
          >
            <SvgIcon
              className="m-1"
              component={BrightnessMediumIcon}
              inheritViewBox
              fontSize="medium"
            />
          </button>
        </div>
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
