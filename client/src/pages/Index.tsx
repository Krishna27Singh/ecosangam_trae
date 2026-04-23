
import { useState } from "react";
import { MapNavigation } from "@/components/MapNavigation";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Home } from "@/components/pages/Home";
import { Dashboard } from "@/components/pages/Dashboard";
import { CarbonCalculator } from "@/components/pages/CarbonCalculator";
import { About } from "@/components/pages/About";
import { UserProfile } from "@/components/pages/UserProfile";
import  LoginSignup  from "@/components/pages/LoginSignup";

const Index = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const renderPage = () => {
    if (!isLoggedIn) {
      return <LoginSignup />;
    }

    switch (currentPage) {
      case "home":
        return <Home />;
      case "dashboard":
        return <Dashboard />;
      case "calculator":
        return <CarbonCalculator />;
      case "about":
        return <About />;
      case "profile":
        return <UserProfile />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      {isLoggedIn && (
        <MapNavigation 
          currentPage={currentPage} 
          onPageChange={setCurrentPage}
          onLogout={() => setIsLoggedIn(false)}
        />
      )}
      <main className="relative z-10 pt-4">
        {renderPage()}
      </main>
    </div>
  );
};

export default Index;
