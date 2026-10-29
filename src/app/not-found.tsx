import { MoreLink, PageHero } from "@/components/ui";

export default function NotFound() {
  return (
    <>
      <PageHero title="ページが見つかりません" lead="URLが変更されたか、削除された可能性があります。" />
      <div className="flex justify-center py-[clamp(48px,6vw,96px)]">
        <MoreLink href="/">トップへ戻る →</MoreLink>
      </div>
    </>
  );
}
