import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/ui";
import { WorksList } from "./WorksList";

export const metadata: Metadata = { title: "施工実績" };

export default function WorksPage() {
  return (
    <>
      <PageHero en="WORKS" title="施工実績" lead="リード文が入ります。" />
      <Suspense>
        <WorksList />
      </Suspense>
    </>
  );
}
