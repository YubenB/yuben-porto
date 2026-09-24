import { useState } from "react";
import emailjs from "@emailjs/browser";
import { ArrowUpRight } from "lucide-react";

type ContactForm = { name: string; email: string; message: string };
type ContactStatus = { type: "" | "error" | "success"; message: string };
type RateLimitRecord = { date: string; count: number };
const STORAGE_KEY = "contact_rate_limit";

const todayKey = () => {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
};

const readLimits = (): Record<string, RateLimitRecord> => {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    return value && typeof value === "object" ? value : {};
  } catch { return {}; }
};

const Contact = () => {
  const [form, setForm] = useState<ContactForm>({ name: "", email: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<ContactStatus>({ type: "", message: "" });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();
    if (!name || !email || !message) {
      setStatus({ type: "error", message: "Please fill in all fields." });
      return;
    }

    const today = todayKey();
    const limits = readLimits();
    if (limits[email]?.date === today && limits[email].count >= 3) {
      setStatus({ type: "error", message: "Daily limit reached for this email. Please try again tomorrow." });
      return;
    }

    const serviceId = import.meta.env.VITE_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_PUBLIC_EMAILJS_PUBLIC_KEY;
    if (!serviceId || !templateId || !publicKey) {
      setStatus({ type: "error", message: "The form is unavailable right now. Please email me directly." });
      return;
    }

    setIsLoading(true);
    setStatus({ type: "", message: "" });
    try {
      await emailjs.send(serviceId, templateId, { from_name: name, to_name: "Yuben", from_email: email, reply_to: email, message }, publicKey);
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...limits, [email]: { date: today, count: limits[email]?.date === today ? limits[email].count + 1 : 1 } })); } catch { /* Storage may be disabled. */ }
      setForm({ name: "", email: "", message: "" });
      setStatus({ type: "success", message: "Message sent. I'll get back to you soon." });
    } catch {
      setStatus({ type: "error", message: "The message couldn't be sent. Please try email instead." });
    } finally { setIsLoading(false); }
  };

  return (
    <div className="inner-page contact-page">
      <div className="page-intro"><p className="section-kicker">Contact</p><h1>Let's talk about <em>what you're building.</em></h1><p>Have a workflow to automate, a platform to build, or a technical problem worth discussing? Send me a note.</p></div>
      <div className="contact-layout">
        <form onSubmit={onSubmit}>
          <div className="form-field"><label htmlFor="name">Your name</label><input id="name" name="name" type="text" autoComplete="name" placeholder="Your name" value={form.name} onChange={handleChange} required /></div>
          <div className="form-field"><label htmlFor="email">Email address</label><input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required /></div>
          <div className="form-field"><label htmlFor="message">What are you working on?</label><textarea id="message" name="message" rows={5} placeholder="Tell me a little about your project..." value={form.message} onChange={handleChange} required /></div>
          <div><button className="button button-dark" type="submit" disabled={isLoading}>{isLoading ? "Sending..." : "Send message"}<ArrowUpRight size={18} strokeWidth={1.8} /></button></div>
          {status.message && <p role="status" className={`contact-status ${status.type}`}>{status.message}</p>}
        </form>
        <aside className="contact-aside"><h2>Prefer your inbox?</h2><p>Email me directly, or connect on the platforms below.</p><a href="mailto:yubenbauty@gmail.com">yubenbauty@gmail.com ↗</a><a href="https://www.linkedin.com/in/yuben-bauty/" target="_blank" rel="me noopener noreferrer">LinkedIn ↗</a><a href="https://github.com/yubenB/" target="_blank" rel="me noopener noreferrer">GitHub ↗</a></aside>
      </div>
    </div>
  );
};

export default Contact;
