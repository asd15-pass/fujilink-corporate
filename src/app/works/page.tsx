import type { Metadata } from "next";
import { Suspense } from "react";
import { Container, PageHero } from "@/components/ui";
import { WorksBrowser } from "@/components/WorksBrowser";
import { WorksView } from "@/components/WorksView";
import { WORKS } from "@/lib/site";

export const metadata: Metadata = { title: "施工実績" };

export default function WorksPage() {
  return (
    <>
      <PageHero en="WORKS" title="施工実績" lead="リード文が入ります。" />
      <Container className="flex flex-col gap-8 pb-[clamp(64px,8vw,104px)] pt-[clamp(40px,5vw,72px)]">
        <Suspense fallback={<WorksView works={WORKS} q={{ ind: [], tag: [] }} page={1} />}>
          <WorksBrowser works={WORKS} />
        </Suspense>
      </Container>
    </>
  );
}
