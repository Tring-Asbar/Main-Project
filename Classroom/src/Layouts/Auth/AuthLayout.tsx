import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../HomePage/Header/Header";
import Footer from "../../HomePage/Footer/Footer";
import SplashScreen from "../../HomePage/SplashScreen/SplashScreen";

const AuthLayout = () => {
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    const hasSeenSplash = localStorage.getItem("hasSeenSplash");

    if (!hasSeenSplash) {
      setShowSplash(true);
      const timer = setTimeout(() => {
        setShowSplash(false);
        localStorage.setItem("hasSeenSplash", "true"); 
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  if (showSplash) {
    
    return (
      <div className="splash-screen">
        <SplashScreen />
        
      </div>
    );
  }
  {localStorage.removeItem("hasSeenSplash")}

  return (
    <>
    {localStorage.removeItem("hasSeenSplash")}
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default AuthLayout;
