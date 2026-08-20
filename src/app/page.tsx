import CtaBanner from "@/components/layout/CtaBanner";
import BusinessSummary from "@/components/sections/BusinessSummary";
import Hero from "@/components/sections/Hero";
import RecruitBanner from "@/components/sections/RecruitBanner";
import StatsBar from "@/components/sections/StatsBar";
import Strengths from "@/components/sections/Strengths";
import WorksPickup from "@/components/sections/WorksPickup";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <BusinessSummary />
      <WorksPickup />
      <Strengths />
      <RecruitBanner />
      <CtaBanner />
    </>
  );
}
