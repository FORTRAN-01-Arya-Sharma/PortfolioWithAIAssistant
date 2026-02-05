import React, { Suspense, lazy } from "react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";

const About = lazy(() => import("./sections/About"));
const Projects = lazy(() => import("./sections/Projects"));
const Contact = lazy(() => import("./sections/Contact"));
const Footer = lazy(() => import("./sections/Footer"));

const App = () => {
  return (
    <main className="relative min-h-screen w-full bg-black overflow-x-hidden">
      {/* Navbar stays fixed or relative at the top */}
      <Navbar />
      
      {/* Hero handles its own full-screen centering */}
      <Hero />
      
      {/* Rest of the site is contained for better readability */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Suspense fallback={<div className="h-screen bg-black" />}>
          <About />
          <Projects />
          <Contact />
          <Footer />
        </Suspense>
      </div>
    </main>
  );
};

export default App;
