"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const FIELDS = [
  { name: "name", label: "お名前", required: true, placeholder: "山田 太郎", type: "text", autoComplete: "name" },
  { name: "company", label: "会社名", required: false, placeholder: "株式会社〇〇", type: "text", autoComplete: "organization" },
  { name: "email", label: "メールアドレス", required: true, placeholder: "example@fujilink.co.jp", type: "email", autoComplete: "email" },
  { name: "tel", label: "電話番号", required: false, placeholder: "000-0000-0000", type: "tel", autoComplete: "tel" },
];
const KINDS = ["施工のご相談", "お見積り依頼", "採用について", "その他"];

function Badge({ required }: { required: boolean }) {
  return required
    ? <span className="rounded bg-accent px-1.5 py-0.5 text-[11px] text-white">必須</span>
    : <span className="rounded bg-line px-1.5 py-0.5 text-[11px] text-sub">任意</span>;
}

const inputCls = "rounded-[10px] border-[1.5px] border-input bg-base px-3.5 text-[15px] text-ink outline-none focus:border-navy";

export function ContactForm() {
  const router = useRouter();
  const [kind, setKind] = useState(0);
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next: Record<string, string> = {};
    for (const f of FIELDS) if (f.required && !String(data.get(f.name) || "").trim()) next[f.name] = `${f.label}を入力してください`;
    const email = String(data.get("email") || "").trim();
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "メールアドレスの形式が正しくありません";
    if (!String(data.get("message") || "").trim()) next.message = "お問い合わせ内容を入力してください";
    setErrors(next);
    if (Object.keys(next).length || !agree) return;
    // TODO: send to the mail/API endpoint once decided (auto-reply + spam protection).
    router.push("/contact/thanks");
  }

  return (
    <form noValidate onSubmit={onSubmit} className="flex flex-col gap-[22px] rounded-[20px] border-2 border-line bg-white p-[clamp(22px,3.4vw,40px)]">
      {FIELDS.map(f => (
        <label key={f.name} className="flex flex-col gap-2">
          <span className="flex items-center gap-2 text-sm font-bold">{f.label}<Badge required={f.required} /></span>
          <input
            name={f.name}
            type={f.type}
            autoComplete={f.autoComplete}
            placeholder={f.placeholder}
            required={f.required}
            aria-invalid={!!errors[f.name]}
            className={`h-[50px] ${inputCls}`}
          />
          {errors[f.name] && <span className="text-[13px] font-bold text-accent">{errors[f.name]}</span>}
        </label>
      ))}
      <fieldset className="flex flex-col gap-2.5">
        <legend className="mb-2.5 flex items-center gap-2 text-sm font-bold">お問い合わせ種別<Badge required /></legend>
        <div className="flex flex-wrap gap-2">
          {KINDS.map((k, i) => (
            <label key={k} className={`cursor-pointer rounded-full border-[1.5px] px-4 py-2.5 text-sm font-bold has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-navy ${kind === i ? "border-navy bg-navy text-white" : "border-input bg-white text-ink"}`}>
              <input type="radio" name="kind" value={k} checked={kind === i} onChange={() => setKind(i)} className="sr-only" />
              {k}
            </label>
          ))}
        </div>
      </fieldset>
      <label className="flex flex-col gap-2">
        <span className="flex items-center gap-2 text-sm font-bold">お問い合わせ内容<Badge required /></span>
        <textarea name="message" rows={7} placeholder="ご相談内容をご記入ください" aria-invalid={!!errors.message} className={`resize-y py-3 ${inputCls}`} />
        {errors.message && <span className="text-[13px] font-bold text-accent">{errors.message}</span>}
      </label>
      <label className="flex cursor-pointer items-center gap-2.5 text-sm font-bold">
        <input type="checkbox" checked={agree} onChange={e => setAgree(e.target.checked)} className="size-[22px] accent-navy" />
        <span>
          <Link href="/privacy" className="border-b-[1.5px] border-navy text-navy">個人情報の取り扱い</Link>に同意する
        </span>
        <Badge required />
      </label>
      <button
        type="submit"
        disabled={!agree}
        className="w-full max-w-[360px] self-center rounded-full bg-navy py-[17px] text-base font-bold text-white disabled:cursor-not-allowed disabled:bg-disabled"
      >
        送信する
      </button>
    </form>
  );
}
