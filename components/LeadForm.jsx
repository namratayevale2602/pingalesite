"use client";

import { useState } from "react";

export default function LeadForm({ title = "Get a callback", subtitle, compact }) {
  const [sent, setSent] = useState(false);
  const [data, setData] = useState({ name: "", phone: "", email: "", interest: "Life Insurance", time: "Within 24h" });

  const onSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  if (compact) {
    return (
      <form onSubmit={onSubmit} className="grid gap-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="field"><label>Name</label><input required value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} /></div>
          <div className="field"><label>Phone</label><input required value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })} /></div>
        </div>
        <div className="field">
          <label>I&apos;m interested in</label>
          <select value={data.interest} onChange={(e) => setData({ ...data, interest: e.target.value })}>
            {["Life Insurance", "General Insurance", "SIP & Investments", "Retirement Planning", "Other"].map((o) => <option key={o}>{o}</option>)}
          </select>
        </div>
        <button className="btn btn-primary" type="submit">{sent ? "✓ Sent — we'll call you" : "Request callback →"}</button>
      </form>
    );
  }

  return (
    <div className="p-8 bg-[var(--bg-elev)] border border-[var(--rule)] rounded-2xl">
      <h4 className="mb-2 text-[28px]">{title}</h4>
      {subtitle && <p className="text-[var(--fg-muted)] text-sm mb-6">{subtitle}</p>}
      <form onSubmit={onSubmit} className="grid gap-3.5">
        <div className="field"><label>Full name</label><input required value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} /></div>
        <div className="grid grid-cols-2 gap-3">
          <div className="field"><label>Phone</label><input required value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })} /></div>
          <div className="field"><label>Email</label><input type="email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} /></div>
        </div>
        <div className="field">
          <label>I&apos;m interested in</label>
          <select value={data.interest} onChange={(e) => setData({ ...data, interest: e.target.value })}>
            {["Life Insurance", "General Insurance", "SIP & Investments", "Retirement Planning", "Tax Planning", "Other"].map((o) => <option key={o}>{o}</option>)}
          </select>
        </div>
        <div className="field">
          <label>Preferred callback</label>
          <select value={data.time} onChange={(e) => setData({ ...data, time: e.target.value })}>
            {["Within 24h", "Within a week", "No rush — when convenient"].map((o) => <option key={o}>{o}</option>)}
          </select>
        </div>
        <button className="btn btn-primary justify-center mt-2" type="submit">
          {sent ? "✓ Sent — we'll be in touch" : "Request a callback →"}
        </button>
        <p className="text-[11px] text-[var(--fg-soft)] leading-[1.5] mt-1">
          By submitting you agree to our privacy policy. We do not share details with third parties.
        </p>
      </form>
    </div>
  );
}
