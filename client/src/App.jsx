import {useState} from "react";
import "resetcss";
import "./App.scss";

import avatar from "./assets/icons/profile-icon.png";

import Header from "./components/Header";
import PromoSection from "./components/PromoSection";
import AdvSection from "./components/AdvSection";
import AboutSection from "./components/AboutSection";
import ProjectSection from "./components/ProjectSection";
import HowSection from "./components/HowSection";
import OurSection from "./components/OurSection";
import TeamSection from "./components/TeamSection";
import Footer from "./components/Footer";
import PopupRegisterWindow from "./UI/PopupRegisterWindow";
import PopupLoginWindow from "./UI/PopupLoginWindow/";

import Auth from "./components/Auth";
import AdminPage from "./components/AdminPage/AdminPage";

function App() {
  const [registerPopupIsOpened, setRegisterPopupIsOpened] = useState(false);
  const [loginPopupIsOpened, setLoginPopupIsOpened] = useState(false);
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth") === "true" ? true : false);
  const [currentlogin, setCurrentlogin] = useState(localStorage.getItem("currentLogin") || "");
  const [userId, setUserId] = useState(localStorage.getItem("userId") || "");
  const [role, setRole] = useState(localStorage.getItem("role") || "");

  const closePopupByClickOnEsc = (e) => {
    if (e.key == "Escape") {
      hideRegisterPopup();
      hideLoginPopup();
    }
  };

  const closePopupByClickOnOverlay = (e) => {
    if (e.target.className == "popup-window popup-window--active") {
      hideRegisterPopup();
      hideLoginPopup();
    }
  };

  const showRegisterPopup = () => {
    window.addEventListener("keydown", closePopupByClickOnEsc);
    window.addEventListener("click", closePopupByClickOnOverlay);
    setRegisterPopupIsOpened(true);
  };

  const hideRegisterPopup = () => {
    setRegisterPopupIsOpened(false);
    window.removeEventListener("keydown", closePopupByClickOnEsc);
  };
  const showLoginPopup = () => {
    window.addEventListener("keydown", closePopupByClickOnEsc);
    window.addEventListener("click", closePopupByClickOnOverlay);
    setLoginPopupIsOpened(true);
  };

  const hideLoginPopup = () => {
    setLoginPopupIsOpened(false);
    window.removeEventListener("keydown", closePopupByClickOnEsc);
  };

  const logOut = () => {
    localStorage.setItem("isAuth", false);
    localStorage.setItem("role", "");
    localStorage.setItem("currentLogin", "");
    localStorage.setItem("userId", "");
    setIsAuth(false);
    setCurrentlogin(false);
    setRole("");
    setUserId("");
  };


  if (window.location.pathname === "/admin") {
    return <AdminPage />;
  }

  if (isAuth) {
    return (
      <Auth
        avatar={avatar}
        currentlogin={currentlogin}
        role={role}
        logOut={logOut}
        userId={userId}
      />
    );
  }

  return (
    <div className='app'>
      <PopupRegisterWindow
        registerPopupIsOpened={registerPopupIsOpened}
        hidePopup={hideRegisterPopup}
        setUserId={setUserId}
        setIsAuth={setIsAuth}
      />
      <PopupLoginWindow
        hideLoginPopup={hideLoginPopup}
        loginPopupIsOpened={loginPopupIsOpened}
        setIsAuth={setIsAuth}
        setUserId={setUserId}
        setCurrentlogin={setCurrentlogin}
        setRole={setRole}
      />
      <Header
        showRegisterPopup={showRegisterPopup}
        showLoginPopup={showLoginPopup}
      />
      <main className='main'>
        <PromoSection showRegisterPopup={showRegisterPopup} />
        <AdvSection />
        <AboutSection />
        <ProjectSection />
        <HowSection
          showRegisterPopup={showRegisterPopup}
          showLoginPopup={showLoginPopup}
        />
        <OurSection />
        <TeamSection showRegisterPopup={showRegisterPopup} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
