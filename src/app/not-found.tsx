import PagePlaceholder from "@/components/layout/PagePlaceholder";

export default function NotFound() {
  return (
    <PagePlaceholder
      eyebrow="404"
      heading="ページが見つかりません"
      note="URLが変更されたか、削除された可能性があります。"
    />
  );
}
