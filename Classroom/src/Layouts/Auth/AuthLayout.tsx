import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../HomePage/Header/Header";
import Footer from "../../HomePage/Footer/Footer";
import SplashScreen from "../../HomePage/SplashScreen/SplashScreen";

const AuthLayout = () => {
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }); 

  return (
    <>
      {!hasLoaded ? (
        <SplashScreen />
      ) : (
        <>
          <Header />
          <Outlet />
          <Footer />
        </>
      )}
    </>
  );
};

export default AuthLayout;
