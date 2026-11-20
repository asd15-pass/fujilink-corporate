"use client";

import { useSearchParams } from "next/navigation";
import { WorksView, type WorksQuery } from "@/components/WorksView";
import { type Work } from "@/lib/site";

const list = (v: string | null) => (v == null || v === "" ? [] : v.split(",").filter(Boolean));

export function WorksBrowser({ works }: { works: Work[] }) {
  const sp = useSearchParams();
  const q: WorksQuery = { ind: list(sp.get("ind")), tag: list(sp.get("tag")) };
  const page = Number(sp.get("page")) || 1;
  return <WorksView works={works} q={q} page={page} />;
}
