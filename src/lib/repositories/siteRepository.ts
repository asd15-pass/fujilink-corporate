import { businesses } from "@/data/businesses";
import { company } from "@/data/company";
import { hero } from "@/data/hero";
import { recruitBanner } from "@/data/recruit";
import { stats } from "@/data/stats";
import { strengths } from "@/data/strengths";
import type { BusinessCategory } from "@/types/business";
import type { CompanyInfo } from "@/types/company";
import type { HeroContent } from "@/types/hero";
import type { RecruitBannerContent } from "@/types/recruit";
import type { StatItem } from "@/types/stat";
import type { Strength } from "@/types/strength";

export async function getBusinessCategories(options?: {
  featuredOnly?: boolean;
}): Promise<BusinessCategory[]> {
  return [...businesses]
    .filter((b) => (options?.featuredOnly ? b.featuredOnTop : true))
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

export async function getStrengths(): Promise<Strength[]> {
  return [...strengths].sort((a, b) => a.displayOrder - b.displayOrder);
}

export async function getStats(): Promise<StatItem[]> {
  return stats;
}

export async function getCompanyInfo(): Promise<CompanyInfo> {
  return company;
}

export async function getHeroContent(): Promise<HeroContent> {
  return hero;
}

export async function getRecruitBanner(): Promise<RecruitBannerContent> {
  return recruitBanner;
}
