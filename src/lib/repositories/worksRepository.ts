import { works } from "@/data/works";
import type { Work } from "@/types/work";

const byDisplayOrder = (a: Work, b: Work) =>
  (a.displayOrder ?? Number.MAX_SAFE_INTEGER) - (b.displayOrder ?? Number.MAX_SAFE_INTEGER);

export async function getAllWorks(): Promise<Work[]> {
  return [...works].sort(byDisplayOrder);
}

export async function getFeaturedWorks(limit = 3): Promise<Work[]> {
  return [...works].filter((w) => w.featured).sort(byDisplayOrder).slice(0, limit);
}

export async function getWorkBySlug(slug: string): Promise<Work | null> {
  return works.find((w) => w.slug === slug) ?? null;
}

export async function getRelatedWorks(slug: string, limit = 3): Promise<Work[]> {
  const current = await getWorkBySlug(slug);
  if (!current) return [];
  return [...works]
    .filter((w) => w.slug !== slug && w.category === current.category)
    .sort(byDisplayOrder)
    .slice(0, limit);
}
