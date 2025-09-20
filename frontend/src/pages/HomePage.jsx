import { useState, useEffect } from "react";
import Hero from "../components/Hero";
import PageLoader from "../components/PageLoader";
import FeatureSection from "../components/FeatureSection";
import Footer from "../components/Footer";
import ChatBot from "../components/ChatBot";

const HomePage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <title>Home | HaveaTalk</title>
      <link className="rounded-full" rel="icon" href="/home-fav-icon.webp" />
      {loading ? (
        <PageLoader />
      ) : (
        <>
          <Hero /> <FeatureSection />
          <Footer /> <ChatBot/>
        </>
      )}
    </>
  );
};

export default HomePage;
