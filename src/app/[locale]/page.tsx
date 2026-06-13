import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import Features from "@/components/sections/Features";
import ROI from "@/components/sections/ROI";
import AccuracyScale from "@/components/sections/AccuracyScale";
import InspectionReports from "@/components/sections/InspectionReports";
import ContinuousMonitoring from "@/components/sections/ContinuousMonitoring";
import AllInOne from "@/components/sections/AllInOne";
import Challenges from "@/components/sections/Challenges";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import Blog from "@/components/sections/Blog";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <Features />
        <ROI />
        <AccuracyScale />
        <InspectionReports />
        <ContinuousMonitoring />
        <AllInOne />
        <Challenges />
        <Pricing />
        <FAQ />
        <Contact />
        <Blog />
      </main>
      <Footer />
    </>
  );
}
