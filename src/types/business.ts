export type BusinessColor = "purple" | "teal" | "yellow" | "accent";

export type BusinessCategory = {
  id: string;
  slug: string;
  name: string;
  nameEn: string;
  summary: string;
  services: string[];
  color: BusinessColor;
  image?: string;
  displayOrder: number;
  featuredOnTop: boolean;
  isProvisional: boolean;
};
