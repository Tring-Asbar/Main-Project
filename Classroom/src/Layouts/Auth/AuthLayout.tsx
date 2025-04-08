import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../HomePage/Header/Header";
import Footer from "../../HomePage/Footer/Footer";
import SplashScreen from "../../HomePage/SplashScreen/SplashScreen";

const AuthLayout = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1000); // 2 seconds
    return () => clearTimeout(timer);
  });

  if (showSplash) {
    return (
      <div className="splash-screen">
        <SplashScreen/>
      </div>
    );
  }

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default AuthLayout;
