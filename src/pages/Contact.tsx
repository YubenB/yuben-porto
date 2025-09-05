import { useState } from "react";
import emailjs from "@emailjs/browser";
import { AlertTriangle, CheckCircle, Loader, Mail, Send } from "lucide-react";
import InteractiveButton from "../components/ui/InteractiveButton";

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  type RateLimitRecord = {
    date: string; // YYYY-MM-DD in local time
    count: number;
  };

  const LOCAL_STORAGE_KEY = "contact_rate_limit";

  const getTodayKey = (): string => {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  };

  const readLimitMap = (): Record<string, RateLimitRecord> => {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (!raw) return {};
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object")
        return parsed as Record<string, RateLimitRecord>;
      return {};
    } catch {
      return {};
    }
  };

  const writeLimitMap = (data: Record<string, RateLimitRecord>) => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
    } catch {
      // ignore write errors (storage full/disabled)
    }
  };

  interface HandleChangeEvent
    extends React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> {}

  const handleChange = (e: HandleChangeEvent) => {
    const { name, value } = e.target;
    setForm((prevForm: ContactForm) => ({ ...prevForm, [name]: value }));
  };

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const { name, email, message } = form;

    if (!name || !email || !message) {
      setStatus({ type: "error", message: "Please fill in all fields." });
      return;
    }

    // Rate limit: max 5 sends per day for this email
    const today = getTodayKey();
    const limitMap = readLimitMap();
    const record = limitMap[email];
    if (record && record.date === today && record.count >= 3) {
      setStatus({
        type: "error",
        message:
          "Daily limit reached for this email. Please try again tomorrow.",
      });
      return;
    }

    const serviceId: string | undefined = import.meta.env
      .VITE_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId: string | undefined = import.meta.env
      .VITE_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey: string | undefined = import.meta.env
      .VITE_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error("EmailJS environment variables are not set.");
      setStatus({
        type: "error",
        message: "Configuration error. Could not send email.",
      });
      return;
    }

    setIsLoading(true);
    setStatus({ type: "", message: "" });

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: form.name,
          to_name: "Yuben", // Or your name
          from_email: form.email,
          reply_to: form.email,
          message: form.message,
        },
        publicKey
      );
      setStatus({
        type: "success",
        message: "Message sent successfully! I'll get back to you soon.",
      });
      // Increment rate limit counter after successful send
      const updated: Record<string, RateLimitRecord> = { ...limitMap };
      const existing = updated[email];
      if (existing && existing.date === today) {
        updated[email] = {
          date: today,
          count: Math.min(existing.count + 1, 5),
        };
      } else {
        updated[email] = { date: today, count: 1 };
      }
      writeLimitMap(updated);
      setForm({ name: "", email: "", message: "" });
    } catch (error: unknown) {
      console.error("FAILED...", error);
      setStatus({
        type: "error",
        message: "Something went wrong. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight">
          Let&apos;s Connect
        </h1>

        <p className="mt-2 text-neutral-400">
          I’m always open to discussing new projects, creative ideas, or
          opportunities to be part of an ambitious vision. Feel free to reach
          out.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left: Form */}
        <div className="md:col-span-2 bg-neutral-900/50 border border-neutral-800 rounded-xl p-5 sm:p-6">
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-1">
              <label
                htmlFor="name"
                className="text-sm font-medium text-neutral-300"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full bg-neutral-800/60 border border-neutral-700 rounded-md px-3 py-2 text-white placeholder-neutral-500 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
                required
              />
            </div>
            <div className="space-y-1">
              <label
                htmlFor="email"
                className="text-sm font-medium text-neutral-300"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full bg-neutral-800/60 border border-neutral-700 rounded-md px-3 py-2 text-white placeholder-neutral-500 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
                required
              />
            </div>
            <div className="space-y-1">
              <label
                htmlFor="message"
                className="text-sm font-medium text-neutral-300"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={6}
                placeholder="Your message here..."
                className="w-full bg-neutral-800/60 border border-neutral-700 rounded-md px-3 py-2 text-white placeholder-neutral-500 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
                required
              />
            </div>
            <div className="flex flex-col items-start gap-4 pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-neutral-800 px-6 py-2.5 text-white font-semibold hover:bg-neutral-900 transition-colors disabled:bg-neutral-700 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader className="animate-spin" size={18} />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </button>
              {status.message && (
                <div
                  className={`flex items-center gap-2 text-sm p-3 rounded-md ${
                    status.type === "success"
                      ? "bg-green-900/40 text-green-300"
                      : "bg-red-900/40 text-red-300"
                  }`}
                >
                  {status.type === "success" ? (
                    <CheckCircle size={16} />
                  ) : (
                    <AlertTriangle size={16} />
                  )}
                  {status.message}
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Right: Contact info */}
        <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-5 sm:p-6">
          <h3 className="text-lg font-semibold">Contact Info</h3>
          <p className="mt-2 text-sm text-neutral-400">
            Prefer email? I usually respond within 1–2 business days.
          </p>
          <div className="mt-4">
            <InteractiveButton
              href="mailto:yubenbauty@gmail.com"
              icon={<Mail size={16} />}
            >
              yubenbauty@gmail.com
            </InteractiveButton>
          </div>

          <div className="mt-8">
            <p className="text-sm font-medium text-neutral-300">Elsewhere</p>
            <div className="mt-3 flex flex-wrap gap-4 text-sm">
              <a
                href="https://www.linkedin.com/in/yuben-bauty/"
                className="text-neutral-400 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/yubenB/"
                className="text-neutral-400 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <a
                href="https://www.instagram.com/yuben.rpb"
                className="text-neutral-400 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
