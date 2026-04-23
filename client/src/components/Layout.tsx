import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { MapNavigation } from "@/components/MapNavigation";
import { Navbar } from "@/components/Navbar";
import { Tabs } from "@/components/tabs"; // Ensure this is correct

const Layout = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState("home");

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
    navigate(`/${page}`);
  };

  const handleLogout = () => {
    // clear any auth if needed
    navigate("/login");
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />

      {/* ✅ Pass required props to MapNavigation */}
      <MapNavigation
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onLogout={handleLogout}
      />

      <Tabs />

      <main className="relative z-10 pt-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
