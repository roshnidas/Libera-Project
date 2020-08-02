// React
import React from "react";

// Components
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import Dashboard from "../components/dashboard/dashboard";

const Home = () => {
  return (
    <div className="libera-project">
      <Navbar />
      <Dashboard />
      <Footer />
    </div>
  );
};

export default Home;
